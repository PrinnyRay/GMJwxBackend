var parseInfo = {
	'parse' : function(movie) {
		res = "";
		res += "影片名： " + movie.title + " / " + movie.titleEng + " / " + movie.alias.join(" / ") + "\n";
		res += "上映年份： " + movie.year + "\n";
		res += "评分： " + movie.rate + "\n";
		res += "国家： " + movie.countries.join(" / ") + "\n";
		res += "分类： " + movie.categories.join(" / ") + "\n";
		res += "导演： " + movie.director + "\n";
		res += "主演： " + movie.starring.join(" / ") + "\n"; 
		res += "简介： " + movie.summary + "\n";
		return res;
  },
  'parseQuery' : function(movie) {
    res = "";
    res += movie.title + ' ' +movie.id + "\n";
    return res;
	},
	'replyPicText' : function(movie) {
		return {
			title: movie.title,
      description: this.parse(movie),
      picurl: movie.cover,
      url: 'https://movie.douban.com/subject/'+movie.id
		}
	}
}

module.exports = parseInfo;