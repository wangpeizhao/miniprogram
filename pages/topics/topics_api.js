'use strict';
var HOST_URI = "https://cnodejs.org/api/v1";
var GET_TOPICS = "/topics";
var GET_TOPICS_ID = "/topic";

function obj2uri(obj){
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
}

module.exports = {
  //获取列表
  getTopicsUri: function(obj){
    return HOST_URI + GET_TOPICS + "?" + obj2uri(obj);
  },
  //获取详情
  getTopicsIdUri: function (obj) {
    return HOST_URI + GET_TOPICS_ID + "?" + obj2uri(obj);
  }
};