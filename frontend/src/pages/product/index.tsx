import { useState, ChangeEvent } from "react";
import Head from "next/head";

import { Header } from "@/src/components/Header";
import { canSSRAuth } from "@/src/utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";

import styles from "./styles.module.scss";

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];
    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Produto</h1>
          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />
              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
            </select>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Digite o preço do produto"
              className={styles.input}
            />
            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
            />
            <button type="submit" className={styles.buttonCadastrar}>
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