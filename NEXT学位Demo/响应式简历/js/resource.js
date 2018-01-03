/**
 * 资源管理器
 */
var resourceHelper = {
    /**
     * 加载图片
     */
    imageLoader: function(src, callback) {
      var image = new Image();
      // 图片加载完成
      image.addEventListener('load', callback);
      image.addEventListener('error', function(e) {
        console.error('img error', e);
      });
      image.src = src;
      return image;
    },
    /**
     * 资源加载
     * @param  {Array} resources 资源列表
     */
    load: function(images, callback) {
      images = images || [];
      // 需要加载的总数
      var total = images.length;
      if (total === 0) {
        return callback([]);
      }
      // 已完成的个数
      var finish = 0; 
  
      // 保存加载后的图片对象和声音对象
      this.images = [];
      var self = this;
  
      // 遍历加载图片
      for(var i = 0 ; i < images.length; i++) {
        var src = images[i];
        // 保存起来
        self.images[i] = self.imageLoader(src, function() {
          // 加载完成
          finish++;
          // 判断是否加载完成
          if( finish === total){
            // 全部加载完成
            callback(self.images);
          }
        });
      }
    },
  }
  
  