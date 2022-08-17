    class Network{
        hostname : string;
        port = 80 ;
        timeout : number;

        
        constructor(hostname:string,port:number,timeout:number){
           this.hostname = hostname;
           this.port = port;
           this.timeout = timeout;
        }
        hostAddressValidator(): boolean{
            const reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
            if (!reg.test(this.hostname)) {
                throw new Error("host address is invalid");
              }
          
              else if (this.hostname === undefined) {
                throw new Error("host address is required");
              }
          
              else if (typeof this.hostname !== "string") {
                throw new TypeError("host address type must be string");
              }
              else{
                return true;
              }
        }
        public connect(){
            if (this.hostAddressValidator()){
                console.log("It's okay bro!");
            }
        }

    }

    const net = new Network('192.168.1.1',80,1000);
    net.connect();