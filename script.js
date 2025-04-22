// Simulação do arquivo dados.json carregado no script
const carros = [
    {
        id: 1,
        modelo: "Onix LT 1.0",
        marca: "Chevrolet",
        ano: 2022,
        imagem: "",
        combustivel: "Flex",
        portas: 4,
        transmissao: "Manual",
        valor_diaria: 120.00
    },
    {
        id: 2,
        modelo: "HB20 Vision",
        marca: "Hyundai",
        ano: 2023,
        imagem: "hb20.png",
        combustivel: "Flex",
        portas: 4,
        transmissao: "Automático",
        valor_diaria: 150.00
    },
    {
        "id": 3,
        "modelo": "Renegade Longitude",
        "marca": "Jeep",
        "ano": 2023,
        "imagem": "renegade.png",
        "combustivel": "Gasolina",
        "portas": 4,
        "transmissao": "Automático",
        "valor_diaria": 210.00
    },
    {
        "id": 4,
        "modelo": "Corolla XEi",
        "marca": "Toyota",
        "ano": 2022,
        "imagem": "corolla.png",
        "combustivel": "Flex",
        "portas": 4,
        "transmissao": "Automático",
        "valor_diaria": 250.00
    },
    {
        "id": 5,
        "modelo": "Civic Touring",
        "marca": "Honda",
        "ano": 2021,
        "imagem": "civic.png",
        "combustivel": "Gasolina",
        "portas": 4,
        "transmissao": "Automático",
        "valor_diaria": 230.00
    },
    {
        "id": 6,
        "modelo": "Fiat Mobi Like",
        "marca": "Fiat",
        "ano": 2022,
        "imagem": "mobi.png",
        "combustivel": "Flex",
        "portas": 4,
        "transmissao": "Manual",
        "valor_diaria": 90.00
    },
    {
        "id": 7,
        "modelo": "Kwid Zen",
        "marca": "Renault",
        "ano": 2023,
        "imagem": "kwid.png",
        "combustivel": "Flex",
        "portas": 4,
        "transmissao": "Manual",
        "valor_diaria": 95.00
    },
    {
        "id": 8,
        "modelo": "Gol Trendline",
        "marca": "Volkswagen",
        "ano": 2021,
        "imagem": "gol.png",
        "combustivel": "Flex",
        "portas": 4,
        "transmissao": "Manual",
        "valor_diaria": 100.00
    },
    {
        "id": 9,
        "modelo": "Compass Limited",
        "marca": "Jeep",
        "ano": 2022,
        "imagem": "compass.png",
        "combustivel": "Diesel",
        "portas": 4,
        "transmissao": "Automático",
        "valor_diaria": 270.00
    },
    {
        "id": 10,
        "modelo": "Tracker Premier",
        "marca": "Chevrolet",
        "ano": 2023,
        "imagem": "",
        "combustivel": "Flex",
        "portas": 4,
        "transmissao": "Automático",
        "valor_diaria": 220.00
    }
];

// Renderiza os cards dos carros
function renderizarCarros() {
    const container = document.getElementById('carrosContainer');
    const selectCarro = document.getElementById('carroLocado');

    carros.forEach(carro => {
        const div = document.createElement('div');
        div.classList.add('carro');
        div.innerHTML = `
            <img src="assets/${carro.imagem}" alt="${carro.modelo}">
            <h3>${carro.modelo}</h3>
            <p>${carro.marca} - ${carro.ano}</p>
            <p>R$ ${carro.valor_diaria.toFixed(2)}/dia</p>
            <button class="btn-detalhes" onclick="verDetalhes(${carro.id})">Ver Detalhes</button>
        `;
        container.appendChild(div);

        const option = document.createElement('option');
        option.value = carro.id;
        option.textContent = carro.modelo;
        selectCarro.appendChild(option);
    });
}

// Exibe modal com detalhes do carro
function verDetalhes(id) {
    const carro = carros.find(c => c.id === id);
    const modal = document.getElementById('modalDetalhes');
    modal.innerHTML = `
        <div class="modal-content">
            <span id="fecharModal" class="fechar">&times;</span>
            <h2>${carro.modelo}</h2>
            <img src="assets/${carro.imagem}" alt="${carro.modelo}">
            <p><strong>Marca:</strong> ${carro.marca}</p>
            <p><strong>Ano:</strong> ${carro.ano}</p>
            <p><strong>Combustível:</strong> ${carro.combustivel}</p>
            <p><strong>Portas:</strong> ${carro.portas}</p>
            <p><strong>Transmissão:</strong> ${carro.transmissao}</p>
            <p><strong>Valor da diária:</strong> R$ ${carro.valor_diaria.toFixed(2)}</p>
        </div>
    `;
    modal.style.display = 'block';

    document.getElementById('fecharModal').onclick = () => {
        modal.style.display = 'none';
    };
}

// Submete locação
document.getElementById('formularioLocacao').addEventListener('submit', function (event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpfCliente = document.getElementById('cpfCliente').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const carroId = parseInt(document.getElementById('carroLocado').value);
    const carro = carros.find(c => c.id === carroId);

    if (cpfCliente.length !== 11 || isNaN(cpfCliente)) {
        alert('CPF inválido. Insira 11 números.');
        return;
    }

    const locacao = {
        nomeCliente,
        cpfCliente,
        dataInicio,
        dataFim,
        carroLocado: carro.modelo,
    };

    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    locacoes.push(locacao);
    localStorage.setItem('locacoes', JSON.stringify(locacoes));

    alert('Locação cadastrada com sucesso!');
    this.reset();
});

// Carrega os carros ao iniciar
document.addEventListener('DOMContentLoaded', renderizarCarros);
