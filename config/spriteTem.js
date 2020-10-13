module.exports = function(data) {
  var perSprite = data.sprites
    .map(function(sprite) {
      return `.icon-${sprite.name} {
  display: inline-block;
  vertical-align: middle;
  width: ${sprite.width / 100}rem;
  height: ${sprite.height / 100}rem;
  background-image: url(${data.sprites[0].image});
  background-size: ${data.spritesheet.width /
    100}rem ${data.spritesheet.height / 100}rem;
  background-position: ${sprite.offset_x / 100}rem ${sprite.offset_y / 100}rem;
}`
    })
    .join('\n\n')

  return perSprite
}
