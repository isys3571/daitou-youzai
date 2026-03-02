module.exports = function(eleventyConfig) {
  // src/ がgitignoreされていてもEleventyでは処理する
  eleventyConfig.setUseGitIgnore(false);

  // 静的ファイルをそのままコピー
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

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
