import { useState } from "react";

export default function FormularioValidador() {
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [erroCpf, setErroCpf] = useState("");
  const [erroCep, setErroCep] = useState("");

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = 11 - (soma % 11);
    let digito1 = resto > 9 ? 0 : resto;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = 11 - (soma % 11);
    let digito2 = resto > 9 ? 0 : resto;

    return cpf[9] === String(digito1) && cpf[10] === String(digito2);

  };

  const validarCEP = (cep) => {
    cep = cep.replace(/\D/g, "");
    return /^[0-9]{8}$/.test(cep);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cpfValido = validarCPF(cpf);
    const cepValido = validarCEP(cep);

    setErroCpf(cpfValido ? "" : "CPF inválido.");
    setErroCep(cepValido ? "" : "CEP inválido.");

    if (cpfValido && cepValido) {
      alert("Dados válidos! 🎉");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Validador de CPF e CEP</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite o CPF"
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erroCpf && <p style={{ color: "red" }}>{erroCpf}</p>}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
          {erroCep && <p style={{ color: "red" }}>{erroCep}</p>}
        </div>
        <button type="submit" style={{ width: "100%", padding: 10, fontSize: 18, cursor: "pointer" }}>
          Validar
        </button>
      </form>
    </div>
  );
}
