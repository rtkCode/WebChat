<h1 align="center">WebChat</h1>

<p align="center"><strong>An encrypted online chat application based on WebSocket</strong></p>

> WebChat is the second project of COMP3031J Security & Privacy

## Introduction
WebChat is an encrypted online chat application based on WebSocket. It allows users to chat with friends in a relatively safe environment. It uses RSA algorithm to encrypt point-to-point information, and DES algorithm to encrypt group chats. In addition, users can send small encrypted files.

For details, you can check the Project Report.pdf

## Examples
<a href="#">Live Demo</a>

<p>
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f1048a9504674b1cc_d20210306_m122700_c000_v0001067_t0048">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f115f1c5396bb954d_d20210306_m122704_c000_v0001076_t0052">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f10595931f130f953_d20210306_m122706_c000_v0001002_t0044">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f11709d527a182b66_d20210306_m122705_c000_v0001080_t0002">
  <img width="15%" src="https://f000.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z9e80f94b4a0900107f1b0d1a_f11182ca8d516bdd8_d20210306_m122702_c000_v0001078_t0044">
</p>

## Libraries
**Vue.js**: <a href="https://vuejs.org/">The Progressive JavaScript Framework</a>

**Vue-Socket.io**: <a href="https://github.com/MetinSeylan/Vue-Socket.io">Socket.io implementation for Vuejs and Vuex</a>

**encryptlong**: <a href="https://www.npmjs.com/package/encryptlong">基于 jsencrypt 扩展长文本分段加解密功能</a>

**FileSaver.js**: <a href="https://github.com/eligrey/FileSaver.js">An HTML5 saveAs() FileSaver implementation</a>

**flask**: <a href="https://github.com/pallets/flask">The Python micro framework for building web applications.</a>

**Flask-SocketIO**: <a href="https://github.com/miguelgrinberg/Flask-SocketIO">Socket.IO integration for Flask applications.</a>

**pycryptodome**: <a href="https://github.com/Legrandin/pycryptodome">A self-contained cryptographic library for Python</a>

## Deployment

### Front-end
You can replace your server address with variable `global.baseAddress` in src/global.js
```
npm run serve
npm run build
```

### Rear-end (Ubuntu)
```
apt-get install screen python3-venv

screen -S webchatserver

cd /home/WebChat-server/

python3 -m venv flaskenv

source flaskenv/bin/activate

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple flask flask_cors flask_httpauth flask_socketio PyCryptodome flask_sqlalchemy eventlet python-dotenv

export FLASK_APP=chatapp/routes.py

flask
```
