import CommentModel from "../models/comment.model.js";
import PostModel from "../models/post.model.js";

/*CREAR COMENTARIO #########################################################################################*/
export const createComment = async (req, res) => {
  try {
    const { description, postId } = req.body;
    const autor = req.userId;
    const comentario = new CommentModel({
      author: autor,
      post: postId,
      description: description,
    });
    //Guarda el comentario
    await comentario.save();
    //Guarda el comentario en la publicación
    const publicacion = await PostModel.findById(postId);
    publicacion.comments.push(comentario._id);
    await publicacion.save();

    // const comentarioConAutor = await comentario.populate("author", ["username", "avatar"]);
    //TRAE TODOS LOS COMENTARIOS DEL POST
    const comentarios = await CommentModel.find({ post: postId }).populate("author", ["username", "avatar"]);

    res.status(201).json(comentarios);
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};

/*VER TODOS LOS COMENTARIOS DE UNA PUBLICACIÓN ##############################################################*/
export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comentarios = await CommentModel.find({ post: postId }).populate("author", ["username", "avatar"]);
    // if (comentarios.length === 0) return res.status(204).json({ message: "No hay comentarios para esta publicación." });
    // if (comentarios.length === 0) return res.status(204).send();
    // res.status(200) . json(comentarios);
    // return
    if (comentarios.length === 0) {
      res.status(204).json({ mensaje: "No hay comentarios en esta publicación" });
    } else {
      res.status(200).json(comentarios);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
    // res.status(500);
    return;
  }
};

/*ACTUALIZAR COMENTARIO #####################################################################################*/
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { description } = req.body;
    console.log("req.body: ", req.body);
    console.log("req.params: ", req.params);
    const comentarioEncontrado = await CommentModel.findById(commentId);
    // Verifica si el comentario existe
    if (!comentarioEncontrado) return res.status(404).json({ message: "Comentario no encontrado." });
    // Verifica si el usuario actual es el autor del comentario
    if (!comentarioEncontrado.author.equals(req.userId)) {
      return res.status(403).json({ message: "No tienes permisos para editar este comentario." });
    }
    // Actualizar el comentario
    const comentarioActualizado = await CommentModel.findByIdAndUpdate(commentId, { description }, { new: true });
    await comentarioActualizado.populate("author", ["username", "avatar"]);
    res.status(200).json(comentarioActualizado);
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};

// /*VER TODOS LOS COMENTARIOS DE UNA PUBLICACIÓN ##############################################################*/
// export const getCommentById = async (req, res) => {
//   try {
//     const { commentId } = req.body;
//     const comentario = await CommentModel.findById(commentId);
//     // if (comentarios.length === 0) return res.status(204).json({ message: "No hay comentarios para esta publicación." });
//     // if (comentarios.length === 0) return res.status(204).send();
//     // res.status(200) . json(comentarios);
//     // return
//     if (comentario.length === 0) {
//       res.status(204).json({ mensaje: "No hay comentarios en esta publicación" });
//     } else {
//       res.status(200).json(comentario);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//     // res.status(500);
//     return;
//   }
// };

/*ELIMINAR COMENTARIO ####################################################################################*/
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comentarioEncontrado = await CommentModel.findById(commentId);
    // Verifica si el comentario existe

    if (!comentarioEncontrado) return res.status(404).json({ message: "Comentario no encontrado." });
    // Verifica si el usuario actual es el autor del comentario
    if (!comentarioEncontrado.author.equals(req.userId)) {
      return res.status(403).json({ message: "No tienes permisos para eliminar este comentario." });
    }
    await CommentModel.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comentario eliminado exitosamente." });
    return;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error.message });
    res.status(500).json({ error });
    return;
  }
};
