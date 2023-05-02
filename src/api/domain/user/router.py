from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import  User
from api.utils import generate_sitemap, APIException
import api.domain.user.controller as Controller

api = Blueprint('api/user', __name__)

@api.route('/register', methods=['POST'])
def create_user():
    body = request.get_json()
    user = Controller.create_user(body)

    if isinstance(user, User):
        return jsonify(user.serialize()), 200
    return jsonify(user), user['status']


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    token = Controller.login(body)

    if token.get('token'):
        return jsonify(token), 200
    return jsonify(token), token['status']


@api.route('/', methods=['GET'])
@jwt_required()
def get_user():
    info_token = get_jwt()
    user = info_token['sub']
    user_response = Controller.get_user(user)
    
    if isinstance(user_response, User):
        return jsonify(user_response.serialize()), 200
    return jsonify(user_response), user_response['status']


@api.route('/', methods=['PUT'])
def updage_user():
    try:
        avatar = request.files['avatar']
        print('avatar', avatar)
        body = request.form.to_dict()
        print('body', body)
        user_update = Controller.update_user(body['user'], avatar)
        return jsonify(user_update.serialize()), 200
    except Exception as error:
        print('Error', error)
        return jsonify('Error interno'), 500
