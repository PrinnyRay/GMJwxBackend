# -*- coding: utf-8 -*-
import requests
import time
from pymongo import MongoClient

def writeDatebase():
    pass

def infoHandler(res):
    return {
        'id' : res['id'],
        'title' : res['title'],
        'titleEng' : res['original_title'],
        'alias' : res['aka'] if 'aka' in res else '',
        'rate' : res['rating']['average'],
        'countries' : res['countries'] if 'countries' in res else '',
        'categories' : res['genres'],
        'year' : res['year'],
        'cover' : res['images']['small'],
        'director' : (res['directors'][0]['name'] if res['directors'] else ''),
        'starring' : [i['name'] for i in res['casts']],
        'summary' : res['summary'][:-3] if 'summary' in res else ''
    }

def getTop250():
    url = 'http://api.douban.com/v2/movie/top250?start='
    conn = MongoClient('localhost', 27017)
    db = conn.GMJwxBackend
    col = db.top250
    for start in range(0,250,20):
        res = requests.get(url+str(start)).json()
        for i in res['subjects']:
            col.save(infoHandler(i))


def getDetail():
    c = []
    base = 'http://api.douban.com/v2/movie/subject/'
    count = 0

    conn = MongoClient('localhost', 27017)
    db = conn.GMJwxBackend
    col = db.movie

    with open('./mvList.txt') as f:
        c = f.readlines()
    for line in c:
        count = count + 1
        url = base + str(line)
        now = time.strftime('%H:%M:%S', time.localtime(time.time()))
        print(now, end=' --- ')
        if not col.find_one({'id':line[:-1]}):
            res = requests.get(url=url).json()
            # print(res)
            res = infoHandler(res)
            col.save(res)
            print('第%d个 --- %s 写入数据库' % (count, res['title']))
            # time.sleep(30)
        else:
            print('第%d个 --- %s 记录已存在，跳过' % (count, col.find_one({'id':line[:-1]})['title']))


if __name__ == '__main__':
    getDetail()
    # getTop250()