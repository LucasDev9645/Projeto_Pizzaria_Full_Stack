import { FormEvent, useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

import { Header } from "@/src/components/Header";
import { api } from "@/src/services/apiClient";

import styles from "./styles.module.scss";
import { canSSRAuth } from "@/src/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (name === "") {
      return;
    }

    await api.post("/category", {
      name: name,
    });

    toast.success("Categoria cadastrada com sucesso");
    setName("");
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar Categorias</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
