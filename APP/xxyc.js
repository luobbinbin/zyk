import asyncio
import json
import requests
import sys
import time

'''
/**

 * 小X远程
 （好多人青龙是在旧手机部署的，使用这个软件可以远程控制旧手机操作）
  每天签到的分钟数基本已经够用了
 
 * 下载地址，我的邀请码：445581
 * http://yc.juziyuancheng.cn/share_invite.html?vcode=445581
 
 * 抓取 https://yc.iuuyc.com/
 * 提取lt=后面的值,并填写到代码里面 xfck=
 * CK需要URL解码https://www.bejson.com/enc/urlencode/提取
 * cron 0 0 8 * * ? 定时自己改 每天一次
 *
 */
'''

# 名称
jbname = "小X远程"
# 填写自己的ck
xfck = ""


# 主方法
async def main():
    await phone_passwd()


# 任务入口
async def submit(ck):
    await qiandao(ck)
    sys.exit(1)


# -------------------------------- 扩展任务Start ----------------------------------


# -------------------------------- 以下为基本功能End ----------------------------------


# -------------------------------- 基本任务Start ----------------------------------


# 签到
async def qiandao(ck):
    url = "https://yc.iuuyc.com/ApiServer?fn=benefit"
    headers = {
        "Host": "yc.iuuyc.com",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "http://yc.iuuyc.com",
        "Referer": "http://yc.iuuyc.com/activecenter.html"
    }
    body = {
        "i": "df49718dd1cb3bde",
        "lt": xfck,
        "v": "6.3.0",
        "t": "0"
    }
    resp = requests.post(url=url, headers=headers, data=body)
    respJson = json.loads(resp.text)
    print(respJson)
    if respJson['status'] == 1:
        print("成功领取" + str(respJson['ta']))


# 13位时间戳
async def get_millisecond():
    millis = int(round(time.time() * 1000))
    return millis


# ----------------------------------- 基本任务End -------------------------------


async def phone_passwd():
    token_list = xfck.split('@')
    if len(token_list) > 0 and len(xfck) != 0:
        print("========== 共找到 " + str(len(token_list)) + " 个账号 ==========")
        for ch in token_list:
            print("开始执行账号[" + ch[0:3] + "]")
            # 默认不调用登录接口
            await submit(ch)
            # await login(ch)
            if isTask == 1:
                print("[" + ch[0:3] + "]任务全部完成")
    else:
        print("未找到CK")
        sys.exit(1)
    sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())

# -------------------------------- Other方法 ----------------------------------

# -------------------------------- Other方法End ----------------------------------