export const Mensaje = ({ mensaje, bqColor = "rojo" }) => {
  let estilo;
  if (bqColor === "rojo") estilo = "card text-white mb-3 border-0 bg-danger";
  if (bqColor === "naranja") estilo = "card text-white mb-3 border-0 bg-warning";
  if (bqColor === "verde") estilo = "card text-white mb-3 border-0 bg-success";
  if (bqColor === "dark") estilo = "card text-white mb-3 border-0 bg-primary";

  return (
    <div className={estilo}>
      <div className="card-header">Ops!</div>
      <div className="card-body">
        <h4 className="card-title">Ocurrió un error: {mensaje}</h4>
        <p className="card-text">Tenemos un problema para mostrar el contenido, intenta actualizar la pagina o intenta nuevamente mas tarde</p>
      </div>
    </div>
  );
};

// style={{ maxWidth: "30rem" }}
