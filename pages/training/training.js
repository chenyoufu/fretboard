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
    motto: '',
    stringNote: '',
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

  resetData: function() {
    this.data.tapped = false
    this.data.right = 0
    this.data.wrong = 0
    clearInterval(this.data.timer)
    this.data.timer = ''
  },

  setDisplayInterval: function(e) {
    this.data.interval = e.detail.value * 1000
    this.refresh()
  },

  tapScore: function(e) {
    if (this.data.tapped) {
      return
    }
    this.data.tapped = true
    let k = e._relatedInfo.anchorTargetText
    let frets = fretNotes[k]
    if (frets && frets.indexOf(this.data.motto.toLowerCase()) >= 0) {
      this.data.right++
    } else {
      this.data.wrong++
    }
    this.setData({
      right: this.data.right,
      wrong: this.data.wrong
    })
  },

  refresh: function(e) {
    this.resetData()
    this.setData({
      right: this.data.right,
      wrong: this.data.wrong
    })
    this.training(this.data.stringNote)
  },

  training: function(k) {
    var frets = strings[k]
    this.shuffle(frets)
    let that = this
    let i = 0
    this.setData({
      motto: '准备'
    })

    this.data.timer = setInterval(function() {
      if (i > 0 && !that.data.tapped) {
        that.data.wrong++
        that.setData({
          wrong: that.data.wrong
        })
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
    let k = noteStringMappings[options.s]
    this.data.stringNote = k
    this.training(k)
  }
})