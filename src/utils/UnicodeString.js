function UnicodeString(maxLength) {
  this.maxLength = maxLength;
  this.array = new Array(maxLength);
  this.reset();
}

UnicodeString.prototype.getString = function () {
  var str = "";
  for (var i = 0; i < this.array.length && this.array[i] != 0x0000; i++)
    str += String.fromCharCode(this.array[i]);

  return str;
};

UnicodeString.prototype.reset = function () {
  for (var i = 0; i < this.maxLength; i++) this.array[i] = 0x0000;
};

UnicodeString.prototype.set = function (s) {
  this.reset();
  for (var i = 0; i < this.maxLength && i < s.length; i++)
    this.array[i] = s.charCodeAt(i);
};

UnicodeString.prototype.setChar = function (p, c) {
  this.array[p] = c;
};

export { UnicodeString };
