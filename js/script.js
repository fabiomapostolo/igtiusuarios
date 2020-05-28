const url ='https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';

let listaPessoas = [];
let btnBuscar = [];
let nome = [];
let usuario = [];
let estatistica = [];
let numberFormat = Intl.NumberFormat('pt-BR');

function start(){
    loadLista();

    btnBuscar = document.querySelector('#btnBuscar');
    carregaUsuarios();

    btnBuscar.classList.add('disabled');
    nome = document.querySelector('#nome');

    btnBuscar.addEventListener('click', buscarNome);
    iniciarNome();
}

window.addEventListener('load', start);

function carregaUsuarios(){
    btnBuscar = document.querySelector('#btnBsucar');
    nome = document.querySelector('#nome');
    usuario = document.querySelector('#usuario');
    estatistica = document.querySelector('#estatisticas');
}

async function loadLista(){
    const res = await fetch(url);
    const peoples = await res.json();

    listaPessoas = peoples.results.map(people => {
        const{name, dob, picture, gender} = people;
        return {
            nome: name.first + ' ' + name.last,
            idade: dob.age,
            img: picture.thumbnail,
            sexo: gender === 'female' ? 'F' : 'M',
        }        
    });
    console.log(listaPessoas);   
}

function iniciarNome(){
    function onKeyUpNome(event){
        let hasText = !!event.target.value && event.target.value.trim() !== '';
        if(hasText){
            btnBuscar.classList.remove('disabled');
        }else{
            btnBuscar.classList.add('disabled');
            Clear();
        }
        if(hasText && event.key == 'Enter'){
            buscarNome();
        }
    }
    nome.addEventListener('keyup', onKeyUpNome);
    Clear();
}

function Clear(){
    usuario.innerHTML = "<strong>Nenhum usuário filtrado</strong>"
    estatistica.innerHTML = "<strong>Nada a ser exibido</strong>"
}

window.addEventListener('load' , start){
    function buscarNome(){
        let nome = nome.value.toLowerCase();

        let filtro = listaPessoas.filter(p =>{
            return p.nome.toLowerCase().includes(nome);
        });

        carregaUsuarios(filtro);
        carregarEstatisticas(filtro);
    }

    function carregaUsuarios(filtro){
        var div = "";

        if(filtro.length === {1){
            div = "<strong>1 usuário encontrado</strong>";            
        }else{
            div = `<strong>${filtro.length} usuários encontrados</strong>`;
        }

        filtro.forEach(p => {
            div+=
            `
            <div class="texto">
               <div><img src="${p.img}" alt="${p.nome}" class="thumbnail"</div>
               <div class="texto1">${p.nome}, ${p.idade} anos </div>
            </div>                      
            `;
        });
        usuario.innerHTML = div;
    }

    function carregarEstatisticas(filtro){
        var div = "<strong>Estatísticas</strong>";
    
        var masculino = filtro.filter(p=>{return p.sexo === 'M'}).length;
    
        var feminino = filtro.filter(p=>{return p.sexo === 'F'}).length;
    
        var idades = filtro.reduce((accumulator, current)=>{
            return accumulator+current.idade;
        }, 0);
    
        var media = numberFormat.format((idades / filtro.length).toFixed(2));
    
        div += `
            <div class="row-text">
                <div class="text">Sexo masculino: <strong>${masculino}</strong></div>
            </div>
            <div class="row-text">
                <div class="text">Sexo feminino: <strong>${feminino}</strong></div>
            </div>
            <div class="row-text">
                <div class="text">Soma das idades: <strong>${idades}</strong></div>
            </div>
            <div class="row-text">
                <div class="text">Média das idades: <strong>${media}</strong></div>
            </div>
        `;
    
        estatistica.innerHTML = div;
    } 
    




