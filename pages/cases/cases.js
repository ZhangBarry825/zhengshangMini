// pages/cases/cases.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMenuShow: false,
        nowGroup: 0,
        customerCase: [],
        groups: [],
        pageSize: 8,
        pageNum: 1,
        hasNextPage: false
    },
    showMore() {
        let that = this
        //console.log("hasNextPage:", that.data.hasNextPage)
        if (!that.data.hasNextPage) {
            wx.showToast({
                title: '暂无更多',
                image: '../../static/images/info.png',
                duration: 2000,
                mask: false,
            })
        } else {
            app.fetchData('/customerCase/getCustomerCaseByPage', 'get', {
                pageNum: that.data.pageNum + 1,
                pageSize: that.data.pageSize,
                caseGroupName: that.data.groups[that.data.nowGroup]
            }).then(res => {
                if (res.data) {
                    let customerCase = that.data.customerCase
                    customerCase = customerCase.concat(res.data.list)
                    that.setData({
                        customerCase: customerCase,
                        hasNextPage: res.data.hasNextPage,
                        pageNum: that.data.pageNum + 1,
                    })
                } else {
                    that.setData({
                        customerCase: [],
                        hasNextPage: false,
                        pageNum: 1,
                    })
                }

            })
        }
    },
    showMenu() {
        let that = this

        this.setData({
            isMenuShow: !that.data.isMenuShow
        })
    },
    selectGroup(num) {
        let that = this
        let index = num.currentTarget.dataset.index

        //console.log('nowGroup:' + index)
        this.fetchCaseList(index)


        this.setData({
            nowGroup: parseInt(index),
            pageNum: 1
        })
    },
    goToCaseDetail(data) {
        let groupName = this.data.groups[this.data.nowGroup]
        let caseName = data.currentTarget.dataset.item.caseName

        let path = '/pages/caseDetail/caseDetail?caseName=' + caseName + '&groupName=' + groupName
        //console.log(path, 123)
        app.navigateTo(path)
    },
    fetchCaseList(index) {
        let that = this
        app.fetchData('/customerCase/getCustomerCaseByPage', 'get', {
            pageNum: 1,
            pageSize: that.data.pageSize,
            caseGroupName: that.data.groups[index]
        }).then(res => {
            //console.log(res.data, 666)
            that.setData({
                customerCase: res.data.list,
                hasNextPage: res.data.hasNextPage
            })
        })
    },
    goHome() {
        app.goHome()
    },
    goToBusinessArea() {
        app.navigateTo('/pages/businessArea/businessArea')
    },
    goToNewsCenter() {
        app.navigateTo('/pages/newsCenter/newsCenter')
    },
    goToCases() {
        app.navigateTo('/pages/cases/cases?group=0')
    },
    goToAboutUs() {
        app.navigateTo('/pages/aboutUs/aboutUs')
    },
    goToContactUs() {
        app.navigateTo('/pages/contactUs/contactUs')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(options, 900)
        this.setData({
            nowGroup: options.group
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let that = this
        app.fetchData('/customerCase/getCustomerCaseGroupName', 'get').then(res => {
            //console.log(res.data, 500)

            that.setData({
                groups: res.data
            })

            app.fetchData('/customerCase/getCustomerCaseByPage', 'get', {
                pageNum: that.data.pageNum,
                pageSize: that.data.pageSize,
                caseGroupName: res.data[that.data.nowGroup]
            }).then(res2 => {
                //console.log(res2.data, 565)
                that.setData({
                    customerCase: res2.data.list,
                    hasNextPage: res2.data.hasNextPage
                })


            })

        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})