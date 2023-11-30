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
    await publicacion.comments.push(comentario._id);
    await publicacion.save();

    const comentarioConAutor = await comentario.populate("author", ["username", "avatar"]);
    res.status(201).json(comentarioConAutor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrió un error al agregar comentario" });
  }
};

/*VER TODOS LOS COMENTARIOS DE UNA PUBLICACIÓN ##############################################################*/
export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comentarios = await CommentModel.find({ post: postId }).populate("author", ["username", "avatar"]);
    if (comentarios.length === 0) return res.status(404).json({ message: "No hay comentarios para esta publicación." });

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener comentarios de la publicación" });
  }
};

/*ACTUALIZAR COMENTARIO #####################################################################################*/
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { description } = req.body;
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

/*ELIMINAR COMENTARIO ####################################################################################*/
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comentarioEncontrado = await CommentModel.findById(commentId);
    // Verifica si el comentario existe
    if (!comentarioEncontrado) return res.status(404).json({ message: "Comentario no encontrado." });
    // Verifica si el usuario actual es el autor del comentario
    if (!comentarioEncontrado.author.equals(req.userId)) {
      return res.status(403).json({ message: "No tienes permisos para editar este comentario." });
    }
    await CommentModel.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comentario eliminado exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};
