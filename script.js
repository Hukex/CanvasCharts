class Canva {
    constructor(canvaID) {
        let e = document.querySelector("#" + canvaID);
        if (e != null) {
            if (e.tagName == ("CANVAS")) {
                e.width = window.innerWidth;
                e.height = window.innerHeight;
                e.className = "canv";
                this.canva = e.getContext("2d");
                this.canva.width = e.width;
                this.canva.height = e.height;
                this.tipo = "1";
                this.numeroDatos = 0;
                this.maximaAlturaDatos = 0;
                this.datos = [];
                this.canva.font = "20px Poppins";
            } else {
                alert("Este elemento no es de tipo canvas");
            }
        } else {
            alert("Este elemento no es valido")
        }
    }
    anhadirDatos() {
        var texto = document.querySelector("#text").value;
        if (texto != "") {
            var valor = parseInt(document.querySelector("#number").value);
            var a = { texto: texto, valor };
            this.datos.push(a);
            this.numeroDatos++;
            this.pintarGrafico();
        } else {
            alert("Necesitas escribir algo en el campo texto")
        }
    }
    cambiarGrafico() {
        switch (this.tipo) {
            case "1":
                this.tipo = "2";
                this.pintarGrafico();
                break;
            case "2":
                this.tipo = "3";
                this.pintarGrafico();
                break;
            case "3":
                this.tipo = "1";
                this.pintarGrafico();
                break;
        }
    }
    pintarGrafico() {
        this.limpiar();
        this.datos.forEach(e => {
            if (e.valor > this.maximaAlturaDatos) {
                this.maximaAlturaDatos = e.valor;
            }
        });
        switch (this.tipo) {
            case "1":
                // COLUMNAS
                this.canva.strokeRect(100, 100, (this.numeroDatos * 50) + 40, 300);
                var cont = 0;
                var tamaño = 40;
                var num = (this.numeroDatos * 100 / this.numeroDatos - tamaño) / 2;
                this.canva.fillStyle = "#717171";
                this.canva.font = "15px Poppins";
                for (let i = 0; i < this.maximaAlturaDatos; i++) {
                    this.canva.strokeRect(100, 400, (this.numeroDatos * 50) + 40, -i * (300 / this.maximaAlturaDatos));
                    this.canva.fillText(i + 1, 80, 400 - ((i + 1) * (300 / this.maximaAlturaDatos)));
                }
                this.datos.forEach(e => {
                    this.canva.fillStyle = "black";
                    this.canva.fillText(e.texto + " (" + e.valor + ")", (this.numeroDatos * 50) + 200, 110 + cont);
                    this.canva.beginPath();
                    this.canva.fillStyle = "rgb(" + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + ")";
                    this.canva.fillRect((this.numeroDatos + num) + 100, 400, tamaño, -e.valor * (300 / this.maximaAlturaDatos));
                    this.canva.fillRect((this.numeroDatos * 50) + 180, 100 + cont, 10, 10);
                    this.canva.closePath();
                    num += 40;
                    cont += 30;
                });
                break;
            case "2":
                // VERTICALES
                this.canva.strokeRect(100, 100, 300, (this.numeroDatos * 50) + 40);
                var cont = 0;
                var tamaño = 40;
                var num = (this.numeroDatos * 100 / this.numeroDatos - tamaño) / 2;
                this.canva.fillStyle = "#717171";
                this.canva.font = "15px Poppins";
                for (let i = 0; i < this.maximaAlturaDatos; i++) {
                    this.canva.strokeRect(400, 100, -i * (300 / this.maximaAlturaDatos), (this.numeroDatos * 50) + 40);
                    this.canva.fillText(this.maximaAlturaDatos - (i + 1), 400 - ((i + 1) * (300 / this.maximaAlturaDatos)), 90);
                }
                this.datos.forEach(e => {
                    this.canva.fillStyle = "black";
                    this.canva.fillText(e.texto + " (" + e.valor + ")", 550, 110 + cont);
                    this.canva.beginPath();
                    this.canva.fillStyle = "rgb(" + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + ")";
                    this.canva.fillRect(100, (this.numeroDatos + num) + 100, e.valor * (300 / this.maximaAlturaDatos), tamaño);
                    this.canva.fillRect(520, 100 + cont, 10, 10);
                    this.canva.closePath();
                    num += 40;
                    cont += 30;
                });
                break;
            case "3":
                //SECTORES
                var total = 0;
                this.datos.forEach(e => {
                    total += e.valor;
                });
                var a = 0;
                for (let i = 0; i < this.datos.length; i++) {
                    this.canva.fillStyle = "black";
                    this.canva.fillText(this.datos[i].texto + " (" + this.datos[i].valor + ")", 500, 100 + (i + 1) * 40);
                    this.canva.beginPath();
                    this.canva.moveTo(300, 300);
                    this.canva.fillStyle = "rgb(" + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + ")";
                    this.canva.fillRect(485, 90 + (i + 1) * 40, 10, 10);
                    this.canva.arc(300, 300, 100, a, a + (Math.PI * 2 * this.datos[i].valor / total));
                    this.canva.fill();
                    a += Math.PI * 2 * (this.datos[i].valor / total);
                    this.canva.closePath();
                }
                break;
        }
    }
    limpiar() {
        this.canva.clearRect(0, 0, this.canva.width, this.canva.height);
    }
}
const k = new Canva("canva"); // Por defecto creo este
function anhadir() {
    k.anhadirDatos();
}

function pintar() {
    k.pintarGrafico();
}

function cambiarGrafico() {
    k.cambiarGrafico();
}