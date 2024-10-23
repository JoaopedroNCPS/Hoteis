const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    database: 'Hoteis'
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Está conectado ao banco de dados.');
});

// --------------------------------------------------------------------
// Divisão Pra nao me Confundir
// --------------------------------------------------------------------

const createClientes = (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;

    const query = 'INSERT INTO Clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Cliente criado com sucesso', result });
        }
    });
};

const readClientes = (req, res) => {
    con.query("SELECT * FROM Clientes", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateClientes = (req, res) => {
    const { nome, cliente_id, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;
    const query = 'UPDATE Clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente atualizado com sucesso', result });
        }
    });
};

const deleteClientes = (req, res) => {
    const { cliente_id } = req.params;
    const query = 'DELETE FROM Clientes WHERE cliente_id = ?';
    con.query(query, [cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente removido com sucesso', result });
        }
    });
};

// --------------------------------------------------------------------
// Divisão Pra nao me Confundir
// --------------------------------------------------------------------

const createEstacionamento = (req, res) => {
    const { cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;

    const query = 'INSERT INTO Estacionamento (cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Estacionamento criado com sucesso', result });
        }
    });
};

const readEstacionamento = (req, res) => {
    con.query("SELECT * FROM Estacionamento", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateEstacionamento = (req, res) => {
    const { estacionamento_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;
    const query = 'UPDATE Estacionamento SET veiculo_marca = ?, veiculo_modelo = ?, veiculo_placa = ?, data_entrada = ?, data_saida = ? WHERE estacionamento_id = ?';
    con.query(query, [veiculo_marca, veiculo_modelo, veiculo_placa, data_entrada, data_saida, estacionamento_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Estacionamento atualizado com sucesso', result });
        }
    });
};

const deleteEstacionamento = (req, res) => {
    const { estacionamento_id } = req.params;
    const query = 'DELETE FROM Estacionamento WHERE estacionamento_id = ?';
    con.query(query, [estacionamento_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Estacionamento removido com sucesso', result });
        }
    });
};

// --------------------------------------------------------------------
// Divisão Pra nao me Confundir
// --------------------------------------------------------------------

const createQuarto = (req, res) => {
    const { numero, andar, tipo, valor_diaria, statusQuarto, cliente_id } = req.body;

    const query = 'INSERT INTO Quartos (numero, andar, tipo, valor_diaria, statusQuarto, cliente_id) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(query, [numero, andar, tipo, valor_diaria, statusQuarto, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Quarto criado com sucesso', result });
        }
    });
};

const readQuarto = (req, res) => {
    con.query("SELECT * FROM Quartos", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateQuarto = (req, res) => {
    const { quarto_id, numero, andar, tipo, valor_diaria, statusQuarto } = req.body;
    const query = 'UPDATE Quartos SET numero = ?, andar = ?, tipo = ?, valor_diaria = ?, statusQuarto = ? WHERE quarto_id = ?';
    con.query(query, [numero, andar, tipo, valor_diaria, statusQuarto, quarto_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Quarto atualizado com sucesso', result });
        }
    });
};

const deleteQuarto = (req, res) => {
    const { quarto_id } = req.params;
    const query = 'DELETE FROM Quartos WHERE quarto_id = ?';
    con.query(query, [quarto_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Quarto removido com sucesso', result });
        }
    });
};

// --------------------------------------------------------------------
// Divisão Pra nao me Confundir
// --------------------------------------------------------------------

const createReservas = (req, res) => {
    const { cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;
    const query = 'INSERT INTO Reservas (cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva) VALUES (?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Reserva criada com sucesso', result });
        }
    });
};

const readReservas = (req, res) => {
    con.query("SELECT * FROM Reservas", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateReservas = (req, res) => {
    const { reserva_id, cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;
    const query = 'UPDATE Reservas SET cliente_id = ?, quarto_id = ?, data_reserva = ?, data_entrada = ?, data_saida = ?, valor_total = ?, statusReserva = ? WHERE reserva_id = ?';
    con.query(query, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva, reserva_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Reserva atualizada com sucesso', result });
        }
    });
};

const deleteReservas = (req, res) => {
    const { reserva_id } = req.params;
    const query = 'DELETE FROM Reservas WHERE reserva_id = ?';
    con.query(query, [reserva_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Reserva removida com sucesso', result });
        }
    });
};

// --------------------------------------------------------------------
// Divisão Pra nao me Confundir
// --------------------------------------------------------------------

const createTelefone = (req, res) => {
    const { telefone_id, numero, tipo } = req.body;
    const query = 'INSERT INTO Telefone (telefone_id, numero, tipo) VALUES (?, ?, ?)';
    con.query(query, [telefone_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Telefone criado com sucesso', result });
        }
    });
};

const readTelefone = (req, res) => {
    const query = 'SELECT * FROM Telefone';
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateTelefone = (req, res) => {
    const { telefone_id, numero, tipo } = req.body;
    const query = 'UPDATE Telefone SET telefone_id = ?, tipo = ? WHERE numero = ?';
    con.query(query, [telefone_id, tipo, numero], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Telefone atualizado com sucesso', result });
        }
    });
};

const deleteTelefone = (req, res) => {
    const { numero } = req.params;
    const query = 'DELETE FROM Telefone WHERE numero = ?';
    con.query(query, [numero], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Telefone removido com sucesso', result });
        }
    });
};


const app = express();
app.use(cors());
app.use(express.json());

app.post('/clientes', createClientes);
app.get('/clientes', readClientes);
app.put('/clientes', updateClientes);
app.delete('/clientes/:cliente_id', deleteClientes);

app.post('/estacionamento', createEstacionamento);
app.get('/estacionamento', readEstacionamento);
app.put('/estacionamento', updateEstacionamento);
app.delete('/estacionamento/:estacionamento_id', deleteEstacionamento);

app.post('/quartos', createQuarto);
app.get('/quartos', readQuarto);
app.put('/quartos', updateQuarto);
app.delete('/quartos/:quarto_id', deleteQuarto);

app.post('/reservas', createReservas);
app.get('/reservas', readReservas);
app.put('/reservas', updateReservas);
app.delete('/reservas/:reserva_id', deleteReservas);

app.post('/telefone', createTelefone);
app.get('/telefone', readTelefone);
app.put('/telefone', updateTelefone);
app.delete('/telefone/:numero', deleteTelefone);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
