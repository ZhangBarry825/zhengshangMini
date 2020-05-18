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
        pageSize: 10
    },
    showMore() {
        let that = this

        console.log(that.data.customerCase)
        console.log(that.data.nowGroup)
        console.log(that.data.customerCase[that.data.nowGroup])
        let page = that.data.customerCase[that.data.nowGroup].nowPage
        console.log("page:" + page)
        app.fetchData('/customerCase/getCustomerCaseByPage', 'get', {
            pageNum: page + 1,
            pageSize:that.pageSize
        }).then(res => {
            console.log(res.data.list, 123)
            if(res.data.list){
                let itemData = that.data.customerCase
                itemData[that.data.nowGroup].caseGroup = itemData[that.data.nowGroup].caseGroup.concat(res.data.list)
                itemData[that.data.nowGroup].nowPage = page + 1
                console.log(itemData, 555)
                this.setData({
                    customerCase: itemData,
                })
            }else {
                console.log('获取失败')
            }

        })
    },
    showMenu() {
        let that = this

        this.setData({
            isMenuShow: !that.data.isMenuShow
        })
    },
    selectGroup(num) {
        let that = this
        let id = num.currentTarget.id

        console.log('id:' + id)
        console.log(this.data.customerCase)

        this.setData({
            nowGroup: parseInt(id)
        })

    },
    goHome() {
        app.goHome()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            nowGroup: options.group
        })
        console.log(this.data.nowGroup, 123)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        app.fetchData('/index/getCustomerCase', 'get').then(res => {
            console.log(res.data, 123)
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].nowPage = 1
            }

            this.setData({
                customerCase: res.data,
                groups: res.data
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