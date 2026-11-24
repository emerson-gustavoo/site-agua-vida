// Função auxiliar: mostra um alerta do Bootstrap dentro de uma div
// - idDiv: id da div onde a mensagem vai aparecer
// - texto: a mensagem que sera exibida
// - tipo:  "success" (verde) ou "danger" (vermelho)
function mostrarMensagem(idDiv, texto, tipo) {
  const div = document.getElementById(idDiv);
  div.innerHTML = `<div class="alert alert-${tipo} mb-0">${texto}</div>`;
}


// ORÇAMENTO (paginas servico1.html, servico2.html, servico3.html)
// Chamada pelo formulario do modal: onsubmit="enviarOrcamento(event)"
function enviarOrcamento(event) {
  event.preventDefault();

  const dados = new FormData();
  dados.append("servico", document.getElementById("orcServico").value);
  dados.append("nome", document.getElementById("orcNome").value);
  dados.append("email", document.getElementById("orcEmail").value);
  dados.append("telefone", document.getElementById("orcTelefone").value);
  dados.append("endereco", document.getElementById("orcEndereco").value);
  dados.append("cidade", document.getElementById("orcCidade").value);
  dados.append("uf", document.getElementById("orcUf").value);
  dados.append("data_desejada", document.getElementById("orcData").value);
  dados.append("observacoes", document.getElementById("orcObs").value);

  fetch("backend/salvar_orcamento.php", {
    method: "POST",
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (resultado.sucesso) {
        mostrarMensagem("orcAlerta", "Solicitação enviada! Em breve entraremos em contato.", "success");
        document.getElementById("formOrcamento").reset();
      } else {
        mostrarMensagem("orcAlerta", "Erro ao enviar a solicitação. Tente novamente.", "danger");
      }
    })
    .catch(function () {
      mostrarMensagem("orcAlerta", "Não foi possível conectar ao servidor.", "danger");
    });
}


// CONTATO (index.html, seção #contato)
// Chamada pelo formulario: onsubmit="enviarContato(event)"
function enviarContato(event) {
  event.preventDefault();

  const dados = new FormData();
  dados.append("nome", document.getElementById("contatoNome").value);
  dados.append("email", document.getElementById("contatoEmail").value);
  dados.append("mensagem", document.getElementById("contatoMensagem").value);

  fetch("backend/salvar_contato.php", {
    method: "POST",
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (resultado.sucesso) {
        mostrarMensagem("contatoAlerta", "Mensagem enviada! Responderemos em breve.", "success");
        document.getElementById("formContato").reset();
      } else {
        mostrarMensagem("contatoAlerta", "Erro ao enviar a mensagem. Tente novamente.", "danger");
      }
    })
    .catch(function () {
      mostrarMensagem("contatoAlerta", "Não foi possível conectar ao servidor.", "danger");
    });
}


let depoimentosCarregados = [];


// LISTAR (Read): busca os depoimentos no banco e monta os cards
function carregarDepoimentos() {
  const lista = document.getElementById("listaDepoimentos");

  fetch("backend/listar_depoimentos.php")
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (depoimentos) {
      depoimentosCarregados = depoimentos;

      let html = "";

      depoimentos.forEach(function (dep, posicao) {
        const foto = "https://ui-avatars.com/api/?name=" + encodeURIComponent(dep.nome) + "&background=0077B6&color=fff";

        html += `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <p class="card-text">"${dep.texto}"</p>
              </div>
              <div class="card-footer bg-white d-flex align-items-center gap-3">
                <img src="${foto}" class="rounded-circle depoimento-foto" alt="Foto de ${dep.nome}">
                <div>
                  <strong>${dep.nome}</strong><br>
                  <small class="text-muted">Enviado em ${dep.data}</small>
                </div>
                <div class="ms-auto d-flex flex-column gap-1">
                  <button type="button" class="btn btn-sm btn-outline-primary" title="Editar"
                          onclick="editarDepoimento(${posicao})"><i class="bi bi-pencil"></i></button>
                  <button type="button" class="btn btn-sm btn-outline-danger" title="Excluir"
                          onclick="excluirDepoimento(${dep.id})"><i class="bi bi-trash"></i></button>
                </div>
              </div>
            </div>
          </div>`;
      });

      lista.innerHTML = html;
    })
    .catch(function () {
      lista.innerHTML = `<div class="col-12"><div class="alert alert-danger">Não foi possível carregar os depoimentos.</div></div>`;
    });
}


// CADASTRAR (Create) ou EDITAR (Update)
// O mesmo formulario serve para os dois casos:
// - campo depId vazio     -> depoimento novo  -> salvar_depoimento.php
// - campo depId com valor -> editando um      -> editar_depoimento.php
// Chamada pelo formulario: onsubmit="enviarDepoimento(event)"
function enviarDepoimento(event) {
  event.preventDefault();

  const id = document.getElementById("depId").value;

  const dados = new FormData();
  dados.append("nome", document.getElementById("depNome").value);
  dados.append("texto", document.getElementById("depTexto").value);

  let arquivoPhp = "backend/salvar_depoimento.php";

  if (id !== "") {
    dados.append("id", id);
    arquivoPhp = "backend/editar_depoimento.php";
  }

  fetch(arquivoPhp, {
    method: "POST",
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (resultado.sucesso) {
        mostrarMensagem("depAlerta", "Depoimento salvo com sucesso!", "success");
        cancelarEdicao();
        carregarDepoimentos();
      } else {
        mostrarMensagem("depAlerta", "Erro ao salvar o depoimento. Tente novamente.", "danger");
      }
    })
    .catch(function () {
      mostrarMensagem("depAlerta", "Não foi possível conectar ao servidor.", "danger");
    });
}


// Botão EDITAR de um card: coloca os dados do depoimento no
// formulario e muda o formulario para o "modo edição"
// - posicao: numero do depoimento na lista depoimentosCarregados
function editarDepoimento(posicao) {
  const dep = depoimentosCarregados[posicao];

  document.getElementById("depId").value = dep.id;
  document.getElementById("depNome").value = dep.nome;
  document.getElementById("depTexto").value = dep.texto;

  document.getElementById("depTitulo").innerHTML = '<i class="bi bi-pencil-square me-2"></i>Editar depoimento';
  document.getElementById("depBotao").innerHTML = '<i class="bi bi-check-lg me-1"></i>Salvar alteração';
  document.getElementById("depCancelar").classList.remove("d-none");
  document.getElementById("depAlerta").innerHTML = "";

  document.getElementById("formDepoimento").scrollIntoView();
}


// Botão CANCELAR: limpa o formulario e volta ao modo
// "novo depoimento" (tambem e chamada depois de salvar)
function cancelarEdicao() {
  document.getElementById("formDepoimento").reset();
  document.getElementById("depId").value = "";

  document.getElementById("depTitulo").innerHTML = '<i class="bi bi-pencil-square me-2"></i>Deixe seu depoimento';
  document.getElementById("depBotao").innerHTML = '<i class="bi bi-send me-1"></i>Enviar depoimento';
  document.getElementById("depCancelar").classList.add("d-none");
}


// EXCLUIR (Delete): apaga um depoimento pelo id
// Chamada pelo botão de lixeira de cada card
function excluirDepoimento(id) {
  if (!confirm("Deseja realmente excluir este depoimento?")) {
    return;
  }

  const dados = new FormData();
  dados.append("id", id);

  fetch("backend/excluir_depoimento.php", {
    method: "POST",
    body: dados
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (resultado) {
      if (resultado.sucesso) {
        carregarDepoimentos();
      } else {
        alert("Erro ao excluir o depoimento.");
      }
    })
    .catch(function () {
      alert("Não foi possível conectar ao servidor.");
    });
}


if (document.getElementById("listaDepoimentos")) {
  carregarDepoimentos();
}
