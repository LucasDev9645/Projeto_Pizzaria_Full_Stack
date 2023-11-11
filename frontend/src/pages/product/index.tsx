import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

import { Header } from "@/src/components/Header";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupApiClient } from "@/src/services/api";

import { FiUpload } from "react-icons/fi";

import styles from "./styles.module.scss";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorieSelected, setCategorieSelected] = useState(0);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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

  function handleChangeCategory(e) {
    setCategorieSelected(e.target.value);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const data = new FormData();
      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.info("Preencha todos os Campos!");
        return;
      }
      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorieSelected].id);
      data.append("file", imageAvatar);

      const apiClient = setupApiClient();

      apiClient.post("/product", data);

      toast.success("Produto Cadastrado com Sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Ops erro ao cadastar!");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
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
          <form className={styles.form} onSubmit={handleRegister}>
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
            <select value={categorieSelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Digite o preço do produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get("/categories");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
