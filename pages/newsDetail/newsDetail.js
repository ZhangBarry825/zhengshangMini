// pages/newsDetail/newsDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMenuShow:false,
    title:'',
    articalDetail:''
  },
  showMenu(){
    let that=this
    this.setData({
      isMenuShow:!that.data.isMenuShow
    })
  },
  goHome(){
    app.goHome()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title,123)
    this.setData({
      title:options.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that= this
    app.fetchData('/newsPageDetail/getNewsText','get',{
      title:that.data.title
    }).then(res=>{
      console.log(res.data,'getNewsText')
      this.setData({
        articalDetail:res.data
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