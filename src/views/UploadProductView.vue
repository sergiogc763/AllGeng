<template>
  <div class="containt">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre:</label>
      <input
        type="text"
        class="form-control"
        id="nombre"
        placeholder="Nombre del producto"
      />
    </div>
    <div class="mb-3">
      <label for="precio" class="form-label">Precio:</label>
      <input type="number" id="precio" step="0.01" min="0" value="1">
    </div>
    <div class="mb-3">
      <label for="imagen" class="form-label">Imagen:</label>
      <input type="file" id="imagen">
    </div>
    <div class="mb-5">
      <label for="descripcion" class="form-label">Descripción:</label>
      <textarea class="form-control" id="descripcion" rows="3"></textarea>
    </div>
    <div class="options mb-2">
        <button type="button" class="btn btn-primary">
            Añadir
        </button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.containt {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(201, 201, 201);
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;

  input,
  textarea {
    width: 25vw;
  }

}
</style>
