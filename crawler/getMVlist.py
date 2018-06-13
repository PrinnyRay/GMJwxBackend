# -*- coding: utf-8 -*-
import requests
import time
import os

def getMovieList(start):
    url = 'https://movie.douban.com/j/new_search_subjects?sort=T&range=0,20&tags=&start='+str(start)
    headers = {
        'Host': 'movie.douban.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': 'bid=GnpDHnd5lRA',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }
    c = requests.get(url=url, headers=headers).json()['data']
    mvList = []
    for item in c:
        mvList.append(item['id'])
    print('下载已完成%.2f%%' % ((start+20)/3000 * 100))
    time.sleep(5)
    return mvList

def main():
    mvList = []
    for i in range(0, 3000, 20):
        mvList += getMovieList(i)
    with open('./mvList.txt', 'w') as f:
        for line in mvList:
            f.write(line+'\n')
    

if __name__ == '__main__':
    main()
