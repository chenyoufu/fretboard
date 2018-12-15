// pages/training/training.js

const noteStringMappings = {
  '6': 'e',
  '5': 'a',
  '4': 'd',
  '3': 'g',
  '2': 'b',
  '1': 'E'
}

const strings = {
  'e': [0, 1, 3, 5, 7, 8, 10, 12],
  'a': [0, 2, 3, 5, 7, 8, 10, 12],
  'd': [0, 2, 3, 5, 7, 9, 10, 12],
  'g': [0, 2, 4, 5, 7, 9, 10, 12],
  'b': [0, 1, 3, 5, 6, 8, 10, 12],
  'E': [0, 1, 3, 5, 7, 8, 10, 12],
}

const fretNotes = {
  '1': ['e8', 'a3', 'd10', 'g5', 'b1', 'E8'],
  '2': ['e10', 'a5', 'd0', 'g7', 'b3', 'E10', 'd12'],
  '3': ['e0', 'a7', 'd2', 'g9', 'b5', 'E0', 'e12', 'E12'],
  '4': ['e1', 'a8', 'd3', 'g10', 'b6', 'E1'],
  '5': ['e3', 'a10', 'd5', 'g0', 'b8', 'E5', 'g12'],
  '6': ['e5', 'a0', 'd7', 'g2', 'b10', 'E5', 'a12'],
  '7': ['e7', 'a2', 'd9', 'g4', 'b0', 'E7', 'a12'],
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'xx',
    motto: '',
    stringName: '',
    interval: 2000,
    tapped: false,
    right: 0,
    wrong: 0,
    timer: ''
  },

  shuffle: function(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  },

  setDisplayInterval: function(e) {
    this.data.interval = e.detail.value * 1000
    clearInterval(this.data.timer)
    this.data.wrong = 0
    this.data.right = 0
    this.data.tapped = false
    this.training(this.data.stringName)
  },

  tapScore: function(e) {
    this.data.tapped = true
    let k = e._relatedInfo.anchorTargetText
    let frets = fretNotes[k]
    if (frets && frets.indexOf(this.data.motto.toLowerCase()) >= 0) {
      this.data.right++
    } else {
      this.data.wrong++
    }
  },

  training: function(k) {
    var frets = strings[k]
    this.shuffle(frets)
    console.log(frets)

    let that = this
    let i = 0

    this.data.timer = setInterval(function() {
      if (i > 0 && !that.data.tapped) {
        that.data.wrong++
      } 
      that.data.tapped = false
      
      var fret = frets[i]
      that.setData({
        motto: k.toUpperCase() + fret
      })
      // 清除定时器
      if (++i == frets.length) {
        clearInterval(that.data.timer)
      }
    }, this.data.interval);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.s //+ '弦'
    })
    let k = noteStringMappings[options.s]
    this.data.stringName = k
    this.training(k)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  openConfirm: function() {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
})