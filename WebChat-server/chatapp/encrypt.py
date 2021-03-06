# from rsa import key, common
import random
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP, PKCS1_v1_5


class Encrypt:
    def __init__(self, username):
        self.__username = username
        self.__private_key = ""
        self.__public_key = ""

    def generate_key(self):
        # (self.__public_key, self.__private_key) = key.newkeys(1024)
        rsa = RSA.generate(1024)
        self.__private_key = rsa.exportKey(pkcs=8, protection="scryptAndAES128-CBC").decode('UTF-8')
        self.__public_key = rsa.publickey().exportKey().decode('UTF-8')
        print(self.__private_key)
        print(self.__public_key)

    def get_private_key(self):
        # return self.__private_key.save_pkcs1("PEM").decode('UTF-8')
        return self.__private_key

    def get_public_key(self):
        # return self.__public_key.save_pkcs1("PEM").decode('UTF-8')
        return self.__public_key
