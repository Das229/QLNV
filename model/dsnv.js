function DSNV(){
    this.employ = [];
    this._addEmploy = function(nv){
        this.employ.push(nv);
    };

    this._find = function(taiKhoan){
        var index = -1;
         for(var i = 0; i < this.employ.length; i++){
            var nv = this.employ[i];
            if(nv.taiKhoan === taiKhoan){
                index = i;
                break;
            }
         }
         return index;
    }

    this._fillInfo = function(taiKhoan){
        var index = dsnv._find(taiKhoan);
        if(index !== -1){
            var nv = this.employ[index];
            return nv;
        };
    };

    this._update = function(nhanVien){
        var index = dsnv._find(nhanVien.taiKhoan);
        for(var index = 0;index < this.employ.length; index++){
            if(index !== -1){
                this.employ[index] = nhanVien;
            };
        };
        return nhanVien;
    };

    this._delete = function(taiKhoan){
        var index = dsnv._find(taiKhoan);
        if(index !== -1){
            this.employ.splice(index, 1);
        }
    }
}