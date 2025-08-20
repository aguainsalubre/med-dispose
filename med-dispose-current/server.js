const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import app from './app.js';
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5175", "http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Dados simulados em memória (em produção, usar banco de dados)
let usuarios = [];
let hospitais = [];
let medicamentos = [];

// Função para inicializar dados de exemplo
const inicializarDados = async () => {
  // Criar usuários de exemplo
  const senhaHashAdmin = await bcrypt.hash('password', 10);
  const senhaHashUser = await bcrypt.hash('password', 10);
  
  usuarios = [
    {
      id: 1,
      email: 'admin@medispose.com',
      senha: senhaHashAdmin,
      nome: 'Administrador',
      tipo: 'admin'
    },
    {
      id: 2,
      email: 'user@medispose.com',
      senha: senhaHashUser,
      nome: 'Usuário Teste',
      tipo: 'user'
    }
  ];

  // Criar hospitais de exemplo
  hospitais = [
    {
      id: 1,
      email: 'hospital1@medispose.com',
      senha: await bcrypt.hash('hospital123', 10),
      nome: 'Hospital Central',
      endereco: 'Rua Principal, 123',
      telefone: '(35) 1234-5678'
    },
    {
      id: 2,
      email: 'hospital2@medispose.com',
      senha: await bcrypt.hash('hospital456', 10),
      nome: 'Hospital São Lucas',
      endereco: 'Av. Secundária, 456',
      telefone: '(35) 9876-5432'
    }
  ];

  // Criar medicamentos de exemplo
  medicamentos = [
    {
      id: 1,
      nome: 'Paracetamol',
      categoria: 'Analgésico',
      quantidade: 100,
      dataVencimento: '2024-12-31',
      hospitalId: 1
    },
    {
      id: 2,
      nome: 'Ibuprofeno',
      categoria: 'Anti-inflamatório',
      quantidade: 50,
      dataVencimento: '2024-11-30',
      hospitalId: 1
    },
    {
      id: 3,
      nome: 'Amoxicilina',
      categoria: 'Antibiótico',
      quantidade: 25,
      dataVencimento: '2024-10-15',
      hospitalId: 2
    }
  ];
};

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rotas de Autenticação

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(password, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email, 
        nome: usuario.nome,
        tipo: usuario.tipo 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Cadastro de Hospital
app.post('/api/auth/cadastro-hospital', async (req, res) => {
  try {
    const { email, senha, nome, endereco, telefone } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Verificar se o email já existe
    const hospitalExistente = hospitais.find(h => h.email === email);
    if (hospitalExistente) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar novo hospital
    const novoHospital = {
      id: hospitais.length + 1,
      email,
      senha: senhaHash,
      nome: nome || 'Hospital',
      endereco: endereco || '',
      telefone: telefone || ''
    };

    hospitais.push(novoHospital);

    res.status(201).json({
      success: true,
      message: 'Hospital cadastrado com sucesso',
      hospital: {
        id: novoHospital.id,
        email: novoHospital.email,
        nome: novoHospital.nome,
        endereco: novoHospital.endereco,
        telefone: novoHospital.telefone
      }
    });

  } catch (error) {
    console.error('Erro no cadastro de hospital:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Login de Hospital
app.post('/api/auth/login-hospital', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Buscar hospital
    const hospital = hospitais.find(h => h.email === email);
    if (!hospital) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(password, hospital.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: hospital.id, 
        email: hospital.email, 
        nome: hospital.nome,
        tipo: 'hospital' 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: hospital.id,
        email: hospital.email,
        nome: hospital.nome,
        tipo: 'hospital'
      }
    });

  } catch (error) {
    console.error('Erro no login do hospital:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rotas de Medicamentos (protegidas)

// Listar todos os medicamentos
app.get('/api/medications', authenticateToken, (req, res) => {
  try {
    res.json({
      success: true,
      data: medicamentos
    });
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar medicamento por ID
app.get('/api/medications/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const medicamento = medicamentos.find(m => m.id === id);
    
    if (!medicamento) {
      return res.status(404).json({
        success: false,
        message: 'Medicamento não encontrado'
      });
    }

    res.json({
      success: true,
      data: medicamento
    });
  } catch (error) {
    console.error('Erro ao buscar medicamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Adicionar novo medicamento
app.post('/api/medications', authenticateToken, (req, res) => {
  try {
    const { nome, categoria, quantidade, dataVencimento } = req.body;

    if (!nome || !categoria || !quantidade || !dataVencimento) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    const novoMedicamento = {
      id: medicamentos.length + 1,
      nome,
      categoria,
      quantidade: parseInt(quantidade),
      dataVencimento,
      hospitalId: req.user.id
    };

    medicamentos.push(novoMedicamento);

    res.status(201).json({
      success: true,
      message: 'Medicamento adicionado com sucesso',
      data: novoMedicamento
    });
  } catch (error) {
    console.error('Erro ao adicionar medicamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Atualizar medicamento
app.put('/api/medications/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, categoria, quantidade, dataVencimento } = req.body;

    const medicamentoIndex = medicamentos.findIndex(m => m.id === id);
    if (medicamentoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Medicamento não encontrado'
      });
    }

    // Atualizar campos fornecidos
    if (nome) medicamentos[medicamentoIndex].nome = nome;
    if (categoria) medicamentos[medicamentoIndex].categoria = categoria;
    if (quantidade) medicamentos[medicamentoIndex].quantidade = parseInt(quantidade);
    if (dataVencimento) medicamentos[medicamentoIndex].dataVencimento = dataVencimento;

    res.json({
      success: true,
      message: 'Medicamento atualizado com sucesso',
      data: medicamentos[medicamentoIndex]
    });
  } catch (error) {
    console.error('Erro ao atualizar medicamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Deletar medicamento
app.delete('/api/medications/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const medicamentoIndex = medicamentos.findIndex(m => m.id === id);
    
    if (medicamentoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Medicamento não encontrado'
      });
    }

    medicamentos.splice(medicamentoIndex, 1);

    res.json({
      success: true,
      message: 'Medicamento removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover medicamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar medicamentos por categoria
app.get('/api/medications/category/:category', authenticateToken, (req, res) => {
  try {
    const categoria = req.params.category;
    const medicamentosFiltrados = medicamentos.filter(m => 
      m.categoria.toLowerCase().includes(categoria.toLowerCase())
    );

    res.json({
      success: true,
      data: medicamentosFiltrados
    });
  } catch (error) {
    console.error('Erro ao buscar medicamentos por categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Buscar medicamentos próximos ao vencimento
app.get('/api/medications/expiring/:days', authenticateToken, (req, res) => {
  try {
    const dias = parseInt(req.params.days);
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() + dias);

    const medicamentosVencendo = medicamentos.filter(m => {
      const dataVencimento = new Date(m.dataVencimento);
      return dataVencimento <= dataLimite && dataVencimento >= hoje;
    });

    res.json({
      success: true,
      data: medicamentosVencendo
    });
  } catch (error) {
    console.error('Erro ao buscar medicamentos vencendo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API Med Dispose rodando!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      cadastroHospital: '/api/auth/cadastro-hospital',
      loginHospital: '/api/auth/login-hospital',
      medications: '/api/medications'
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota ${req.method} ${req.originalUrl} não encontrada`
  });
});

// Inicializar dados e servidor
inicializarDados().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse a API em: http://localhost:${PORT}`);
    console.log('Dados de exemplo carregados!');
  });
}).catch(err => {
  console.error('Erro ao inicializar dados:', err);
  process.exit(1);
});

