const chars = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = chars.length;

class Base58 {

    encode(number) {
      let encoded = '';
      while (number){
        const index = number % base;
        number = Math.floor(number / base);
        encoded = chars[index].toString() + encoded;
      }
      return encoded;
    }

    decode(text){
      let decoded = 0;
      while (text){
        const index = chars.indexOf(text[0]);
        const power = text.length - 1;
        decoded += index * (Math.pow(base, power));
        text = text.substring(1);
      }
      return decoded;
    }

}

module.exports = new Base58();
