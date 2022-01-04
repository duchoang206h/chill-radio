function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    string = string.split(' ');
    string = string.map(w => w.charAt(0).toUpperCase() + w.slice(1))
    return string.join(' ');
  }
module.exports = capitalizeFirstLetter;