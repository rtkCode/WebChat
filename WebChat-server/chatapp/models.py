from chatapp import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    public_key = db.Column(db.String(1024))
    online = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_time = db.Column(db.DateTime, index=True)
    content = db.Column(db.String(512), index=True)

    def __repr__(self):
        return '<Post {}>'.format(self.body)
