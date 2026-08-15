import express from 'express';
const app = express();

const port = process.env.PORTA;

app.post("/users/cadastro/:email/:senha", async (req, res) => {
    try{
    const email = req.params.email;
    const senha = req.params.senha;
    

    res.status(200)

    }catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }

  
    // res.status(200).json({"message": "User registered successfully!"});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});