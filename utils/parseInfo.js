function parseInfo(movie) {
    res = "";
    res += "影片名： " + movie.title + " / " + movie.titleEng + "\n";
    res += "上映年份： " + movie.year + "\n"; 
    res += "国家： " + movie.countries.join(" / ") + "\n";
    res += "分类： " + movie.categories.join(" / ") + "\n";
    res += "导演： " + movie.director + "\n";
    res += "主演： " + movie.starring.join(" / ") + "\n"; 
    res += "简介： " + movie.summary + "\n";
    return res;
}

module.exports = parseInfo;