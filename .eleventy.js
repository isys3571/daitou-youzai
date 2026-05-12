module.exports = function(eleventyConfig) {
  // src/ がgitignoreされていてもEleventyでは処理する
  eleventyConfig.setUseGitIgnore(false);

  // 静的ファイルをそのままコピー
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // ファビコン一式をルート直下に配置
  eleventyConfig.addPassthroughCopy({
    "src/favicons/favicon.ico": "favicon.ico",
    "src/favicons/favicon.svg": "favicon.svg",
    "src/favicons/favicon-16.png": "favicon-16.png",
    "src/favicons/favicon-32.png": "favicon-32.png",
    "src/favicons/apple-touch-icon.png": "apple-touch-icon.png",
    "src/favicons/icon-192.png": "icon-192.png",
    "src/favicons/icon-512.png": "icon-512.png",
    "src/favicons/site.webmanifest": "site.webmanifest"
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["html", "njk"],
    htmlTemplateEngine: "njk"
  };
};
