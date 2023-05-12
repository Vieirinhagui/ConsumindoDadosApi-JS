async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPconvertida = await consultaCEP.json();
    if (consultaCEPconvertida.erro) {
      throw Error("CEP não existente");
    }
    var bairro = document.getElementById("bairro");
    var cidade = document.getElementById("cidade");
    var endereco = document.getElementById("endereco");
    var uf = document.getElementById("estado");

    bairro.value = consultaCEPconvertida.bairro;
    cidade.value = consultaCEPconvertida.localidade;
    endereco.value = consultaCEPconvertida.logradouro;
    uf.value = consultaCEPconvertida.uf;

    return consultaCEPconvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p> CEP inválido. Tente Novamente! </p>`;
  }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
