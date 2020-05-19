// pages/contactUs/contactUs.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMenuShow: false,
        markers: [
            {
                id: 1,
                latitude: 34.769820,
                longitude: 113.767800,
                title: '正尚网络科技'
            }
        ],
        name: '',

        formData: {
            name: '',
            phoneNumber: '',
            need: ''
        }
    },
    submitForm() {
        let that = this
        //console.log(this.data.formData, 123)
        if (this.data.formData.name === '' || this.data.formData.phoneNumber === '' || this.data.formData.need === '') {
            wx.showToast({
                title: '请输入正确信息',
                image: '../../static/images/info.png',
                duration: 2000,
                mask: false,
            })
        } else if (this.data.formData.phoneNumber.length < 11) {
            wx.showToast({
                title: '请检查手机号码',
                image: '../../static/images/info.png',
                duration: 2000,
                mask: false,
            })
        } else {
            app.postData('/contactUs/projectNeed', that.data.formData).then(res => {
                //console.log(res, 999)
                if (res.data) {
                    wx.showToast({
                        title: '提交成功',
                        duration: 2000,
                    })
                }
            })
        }
    },
    updateName(e) {
        let formData = this.data.formData
        formData.name = e.detail.value
        this.setData({
            formData: formData
        })
    },
    updatePhoneNum(e) {
        let formData = this.data.formData
        formData.phoneNumber = e.detail.value
        this.setData({
            formData: formData
        })
    },
    updateNeeds(e) {
        let formData = this.data.formData
        formData.need = e.detail.value
        //console.log(e.detail)
        this.setData({
            formData: formData
        })
    },
    showMenu() {
        let that = this
        this.setData({
            isMenuShow: !that.data.isMenuShow
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

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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