//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        baseUrl: 'https://www.zhengshangwl.com'
    },
    goHome() {
        wx.reLaunch({
            url: '/pages/home/home'
        })
    },
    navigateTo(path) {
        wx.navigateTo({
            url: path,
        })
    },
    fetchData(url,method,data) {
        wx.showLoading({
            title: '加载中',
        })

        return new Promise((resolve, reject) => {

            wx.request({//这里是请求话不多说
                url: this.globalData.baseUrl + url,
                data: data,
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                method: method,
                success: function (res) {//正确的时候
                    resolve(res)//Promise返回成功
                },
                fail: function (res) {//错误的时候
                    reject(res);//Promise返回失败
                },
                complete() {
                    //console.log(url+'调用完成')
                    wx.hideLoading({})
                }
            })

        })
    },
    postData(url,data) {
        wx.showLoading({
            title: '加载中',
        })

        return new Promise((resolve, reject) => {

            wx.request({//这里是请求话不多说
                url: this.globalData.baseUrl + url,
                data: data,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                success: function (res) {//正确的时候
                    resolve(res)//Promise返回成功
                },
                fail: function (res) {//错误的时候
                    reject(res);//Promise返回失败
                },
                complete() {
                    //console.log(url+'调用完成')
                    wx.hideLoading({})
                }
            })

        })
    }
})