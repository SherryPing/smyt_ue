#coding:utf8

import sys
reload(sys)
sys.setdefaultencoding("utf-8")

import json

def test():

    status = [{'success':True,
              'msg':'',
               'data':'持仓2017-01-10.csv'
              },
              {'success':False,
              'msg':'列名不匹配',
              'data':'净值2017-01-10.csv'
              },
              ]
    encodedjson = json.dumps(status, encoding='utf-8')
    #encodedjson = "[" + encodedjson + "]"
    print encodedjson
    return encodedjson


if __name__ == "__main__":
	test()




