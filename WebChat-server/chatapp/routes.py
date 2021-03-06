import re
import datetime

from chatapp import app, db
from .models import User, Message
from .encrypt import Encrypt
from .config import Config

from flask import request, jsonify, g
from flask_cors import CORS
from flask_httpauth import HTTPTokenAuth
from flask_socketio import SocketIO, send, emit

from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import BadSignature, SignatureExpired


auth = HTTPTokenAuth()
CORS(app, supports_credentials=True)

socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")


@socketio.on('webchat_message')
def chat_message(form):
    print(form)
    sender_id = form["sender"]
    receiver_id = form["receiver"]
    content = form["message"]
    post_time = datetime.datetime.now()

    message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content, post_time=post_time)
    db.session.add(message)
    db.session.commit()

    send(form, broadcast=True)


@socketio.on('webchat_group_message')
def chat_group(form):
    print(form)
    emit("webchat_group_message", form, broadcast=True)


@socketio.on('webchat_file')
def chat_group(form):
    print(form)
    emit("webchat_file", form, broadcast=True)


@app.route("/login", methods=['POST'])
def login():
    if "username" in request.form.keys() and "password" in request.form.keys():
        username = request.form["username"]
        password = request.form["password"]

        user_in_db = User.query.filter(User.username == username).first()
        if not user_in_db:
            return jsonify({
                "code": 400,
                "msg": "Invalid username or password"
            })
        if check_password_hash(user_in_db.password_hash, password):
            token = generate_token(user_in_db.username)

            # add online tag
            user_in_db.online = True
            db.session.commit()

            return jsonify({
                "code": 200,
                "msg": "Login success",
                "token": token
            })
        else:
            return jsonify({
                "code": 400,
                "msg": "Invalid username or password"
            })
    else:
        return jsonify({
                "code": 400,
                "msg": "Invalid data"
        })


@app.route("/verifyToken", methods=['POST'])
@auth.login_required
def verify_token():
    return jsonify({
            "code": 200,
            "msg": "Verify success"
        })


@app.route("/userList", methods=['GET'])
@auth.login_required
def user_list():
    if g.user is not None:
        user = User.query.filter().all()
        user_list = []
        for u in user:
            user_item = {}
            user_item["id"] = u.id
            user_item["username"] = u.username
            user_item["online"] = u.online
            user_item["key"] = u.public_key
            user_list.append(user_item)
        return jsonify({
            "code": 200,
            "data": user_list
        })
    return jsonify({
        "code": 400,
        "msg": "failed"
    })


@app.route("/userId", methods=['GET'])
@auth.login_required
def user_id():
    if g.user is not None:
        user = g.user.username
        user_in_db = User.query.filter(User.username == user).first()
        return jsonify({
            "code": 200,
            "data": {
                "id": user_in_db.id,
                "username": user_in_db.username,
                "publicKey": user_in_db.public_key
            }
        })
    return jsonify({
        "code": 400,
        "msg": "failed"
    })


@app.route("/verifyUserId", methods=['POST'])
def verify_user_id():
    if "username" in request.form.keys():
        username = request.form["username"]
        user_in_db = User.query.filter(User.username == username).first()
        if not user_in_db:
            return jsonify({
                "code": 201,
                "msg": "Username is available"
            })
        else:
            return jsonify({
                "code": 401,
                "msg": "Username already exists"
            })
    else:
        return jsonify({
            "code": 400,
            "msg": "Invalid data"                
        })
        

@app.route("/register", methods=['POST'])
def register():
    if "username" in request.form and "password" in request.form:
        username = request.form["username"]
        password = request.form["password"]

        user_in_db = User.query.filter(User.username == username).first()
        if user_in_db:
            return jsonify({
                'code': 400,
                'msg': 'Username already exists'
            })
        
        if len(password) < 6 or len(password) > 18:
            return jsonify({
                'code': 400,
                'msg': 'Password length wrong'
            })

        if re.match('^[a-zA-Z]{1}[a-zA-Z0-9\_]{3,15}$', username) is None:
            return jsonify({
                'code': 400,
                'msg': 'Username format wrong'
            })

        en = Encrypt(username)
        en.generate_key()
        public_key = en.get_public_key()
        private_key = en.get_private_key()

        passwd_hash = generate_password_hash(password)

        user = User(username=username, password_hash=passwd_hash, public_key=public_key)
        db.session.add(user)
        db.session.commit()

        return jsonify({
            'code': 200,
            'msg': 'register success',
            'privateKey': private_key
        })
    
    else:
        return jsonify({
            'code': 400,
            'msg': 'register failure'
        })


@app.route("/changePassword", methods=['PUT'])
@auth.login_required
def change_password():
    user_in_db = ""

    if g.user is not None:
        user = g.user.username
        user_in_db = User.query.filter(User.username == user).first()
    else:
        return jsonify({"code": 400, "msg": "User type invalid"})

    if "prev_password" in request.form and "new_password" in request.form:
        password = request.form["prev_password"]
        new_password = request.form["new_password"]
        if len(new_password) > 5 and len(new_password) < 19:
            if check_password_hash(user_in_db.password_hash, password):
                user_in_db.password_hash = generate_password_hash(new_password)
                db.session.commit()
                return jsonify({"code": 200, "msg": "password changed"})
            else:
                return jsonify({"code": 400, "msg": "wrong password"})
        else:
            return jsonify({"code": 400, "msg": "Password length not match"})
    else:
        return jsonify({"code": 400, "msg": "Format error"})


@app.route("/updateProfile", methods=['PUT'])
@auth.login_required
def update_profile():
    if "username" in request.form:
        if g.user is not None:
            user = g.user
            user_in_db = User.query.filter(User.username == user.username).first()
        else:
            return jsonify({
                "code": 401,
                "msg": "Unauthorized"

            })

        username = request.form["username"]

        if re.match('^[a-zA-Z]{1}[a-zA-Z0-9\_]{3,15}$', username) is None:
            return jsonify({
                'code': 400,
                'msg': 'Username format wrong'
            })

        user_in_db.username = username
        db.session.commit()

        return jsonify({
            "code": 200,
            "msg": "Success"
        })

    return jsonify({
        "code": 400,
        "msg": "Failed"
    })


@app.route("/logout", methods=['POST'])
@auth.login_required
def logout():
    user = g.user.username
    user_in_db = User.query.filter(User.username == user).first()

    # add offline tag
    user_in_db.online = False
    db.session.commit()

    g.user = None
    return jsonify({
            "code": 200,
            "msg": "Logout success"
        })


@auth.verify_token
def verify_token(token):
    g.user = None
    s = Serializer(Config.SECRET_KEY)
    try:
        data = s.loads(token)
    except SignatureExpired:
        return False
    except BadSignature:
        return False
    username = data["username"]
    if not username:
        return False
    else:
        g.user = User.query.filter(User.username == username).first()
        return True


@auth.error_handler
def error_handler():
    return jsonify({
            'code': 404,
            'msg': 'Unauthorized Operation'
        })


def generate_token(user):
    expiration = 3600
    serializer = Serializer(Config.SECRET_KEY, expires_in=expiration)
    token = serializer.dumps({"username": user}).decode("ascii")
    return token


socketio.run(app, host='0.0.0.0', port=5000, debug=True)

