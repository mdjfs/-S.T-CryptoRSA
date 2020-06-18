
/**
 * If you need encrypt/decrypt some binaries, you can uses this library
 * 
 * Algorithm RSA implemented by Marcos Fuenmayor
 * 
 * @param {Array<Number>} private_key - If you have a private key 
 * put the two prime numbers to makes Private Key, example: [38501, 45541], 
 * by default, the private key is null. the numbers of private key need to have size 
 * of 16 bits or more
 * 
 * @param {Number} public_key - If you have a public key
 * put the number of public key, example: 1753374041 (38501 * 45541) 
 * , by default, the public key is null
 */
class CryptoRSA{

    constructor(private_key=null, public_key=null){

        this.isPrime = function(number){
            var isPrime = true;
            for(var i=2; i<=10 ; i++){
                if((number % i) == 0 && number != i)
                    isPrime = false;
            }
            return isPrime;
        }


        if(private_key != null){
            this.private_key=null;
            if(private_key.length == 2){
                if(this.isPrime(private_key[0]) && this.isPrime(private_key[1])){
                    if(private_key[0].toString(2).length >= 16 && private_key[1].toString(2).length >= 16){
                        this.private_key=private_key;
                    }
                    else{
                        console.error("CryptoRSA: minimum 16 bits length of numbers in private key");
                    }
                }
                else{
                    console.error("CryptoRSA: need prime numbers in private key");
                }
            }
        }
        else{
            this.private_key=private_key;
        }

        if(public_key != null){
            this.public_key=parseInt(public_key);
        }
        else{
            if(this.private_key != null){
                this.public_key = this.private_key[0] * this.private_key[1];
            }
            else{
                this.public_key=public_key;
            }
        }

    }

    /**
     * If you set the public key, you can encrypt some binaries
     * @param {ArrayBuffer} binaries - Binary object
     * @returns {Array<Number>} - Returns array of numbers encrypted, if you don't set the public key, returns []
     */
    encrypt(binaries){
        var numbers_encrypted = [];
        if(this.public_key != null){
            /* - bytes to number - */
            var uint8View = new Uint8Array(binaries);
            // --- //
            /* - encrypt numbers - */
            for(var number of uint8View){
                var c = Math.pow(number, 3) % this.public_key;
                numbers_encrypted.push(c);
            }
            // --- //

        }
        else{
            console.error("CryptoRSA: Public key is not set");
        }
        return numbers_encrypted;
    }

    /**
     * If you set the private key, you can decrypt to binaries
     * @param {Array<Number>} numbers_encrypted - The array of numbers that was encrypted
     * @returns {ArrayBuffer} - the binaries decrypted, if you don't set the private key, 
     * returns array buffer with the default length
     */
    decrypt(numbers_encrypted){
        var binaries = new ArrayBuffer();
        if(this.private_key != null){
            /* -- decrypt numbers -- */
            var array = []
            var n = this.private_key[0] * this.private_key[1];
            var o = (this.private_key[0]-1) * (this.private_key[1]-1);
            var d = Math.pow(3, -1) % o;
            for(var number of numbers_encrypted){
                var m = Math.round(Math.pow(number, d) % n);
                array.push(m);
            }
            /* --- */
            /* -- number to bytes -- */
            var binary = new Uint8Array(array);
            binaries = binary.buffer;
            /* --- */
        }
        else{
            console.error("CryptoRSA: Private key is not set");
        }
        return binaries;
    }

    /** If you set the private key, the method calcs public key 
     * @returns {Number} - public key, example: 33, default returns null
    */
    getpublic_key(){
        return this.public_key;
    }

    /**
     * set param public keys to decrypt
     * @param {Number} public_key - public key value, example: 33
     */
    setpublic_key(public_key){
        this.public_key = parseInt(public_key);
    }

}


export {CryptoRSA}