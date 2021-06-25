create table usuario (
    Id_Usuario int AUTO_INCREMENT PRIMARY KEY,
    Foto VARCHAR (200),
    Matricula INT,
    Nombre VARCHAR (200),
    Apellido VARCHAR (200),
    Correo VARCHAR (200),
    Fecha_Nacimiento DATE,
    Nivel INT
)

create table escuelas(
    Id_Escuelas INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Escuelas VARCHAR (10),
    Nombre VARCHAR (200),
    Descripcion VARCHAR(1000),
    latitude VARCHAR(100),
    longitude VARCHAR(100),
    Tanda VARCHAR (200),
    Modalidad VARCHAR (200)
)

create table curso(
    ID_Curso int PRIMARY KEY AUTO_INCREMENT,
    Grado VARCHAR (200),
    Tanda VARCHAR (200)
)

create table cargo(
    Id_Cargo int AUTO_INCREMENT PRIMARY KEY,
    Cargo VARCHAR (200)
)

--Chats--

create table sala(
    id_Sala int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR (30),
    Fecha DATE,
    id_Tipo int,
    FOREIGN KEY (id_Tipo) REFERENCES tipo_sala(id)
)

create table sala_usuario(
    Id int AUTO_INCREMENT PRIMARY KEY,
    Id_Sala INT,
    Id_Usuario INT,
    FOREIGN KEY (Id_Sala) REFERENCES sala(id_Sala),
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

create table tipo_sala(
    id int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30)
)

create table mensaje (
    id int AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR (1638),
    id_Sala INT,
    id_Usuario INT,
    fecha DATE,
    FOREIGN KEY (Id_Sala) REFERENCES sala(id_Sala),
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

--Secundarias
create table solicitud(
    Id_Solicitud INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE,
    Estatus VARCHAR(200),
    Id_Escuelas INT,
    Id_Usuario INT,
    FOREIGN KEY (Id_Escuelas) REFERENCES escuelas(Id_Escuelas),
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

create table usuario_estudiante(
    ID_Estudiante int AUTO_INCREMENT PRIMARY KEY,
    Contraseña VARCHAR (200),
    Id_Usuario INT,
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

create table cargo_seleccionar(
    Id_Cargo_Seleccionar INT AUTO_INCREMENT PRIMARY KEY,
    Id_Escuelas int,
    Id_Cargo int,
    Id_Usuario int,
    FOREIGN KEY (Id_Escuelas) REFERENCES escuelas(Id_Escuelas),
    FOREIGN KEY (Id_Cargo) REFERENCES cargo (Id_Cargo),
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

create table usuario_administrativo(
    Id_Usu_Administrativo int AUTO_INCREMENT PRIMARY KEY,
    Contraseña VARCHAR (200),
    Id_Usuario int,
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

create table eventos(
    Id_Eventos int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR (300),
    Fecha_Ini DATE,
    Fecha_Fin DATE,
    Id_Escuelas INT,
    FOREIGN KEY (Id_Escuelas) REFERENCES escuelas(Id_Escuelas)
)

--Documentos
create table documentos(
    Id_documentos INT  AUTO_INCREMENT  PRIMARY KEY,
    Nombre VARCHAR (300),
    UrlDocs VARCHAR (300),
    Estado VARCHAR (30),
    Id_Escuelas INT,
    Id_Usuario INT,
    FOREIGN KEY (Id_Escuelas) REFERENCES escuelas(Id_Escuelas),
    FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
)

select * from Estudiantes;
select * from Inscripcion;
select * from Documentos;
select * from Solicitud;
select * from Escuelas;
select * from Administrativo;
select * from Usuario_Administrativo;


drop table usuario
drop table cargo
drop table curso
DROP table curso_Relacion
drop table administrativos
drop table solicitud
DROP table usuario_Estudiante
drop table cargo_Seleccionar
drop table usuario_Administrativo


insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('1' ,'Etienne', 'Pike', 'epike0@multiply.com', 12/18/2002, 1);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('2','Constantin', 'Brodeur', 'cbrodeur1@vimeo.com', 7/19/2004, 1);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('3','Loretta', 'Gatenby', 'lgatenby2@hao123.com', 4/29/2007, 2);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('4','Jamill', 'Collyear', 'jcollyear3@icq.com', 4/9/2007, 2);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('5','Tresa', 'McGroarty', 'tmcgroarty4@uol.com.br', 8/7/2005, 2);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('6','Monika', 'Astman', 'mastman5@engadget.com', 11/23/2005, 1);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('7','Zena', 'Etherton', 'zetherton6@odnoklassniki.ru', 6/5/2010, 3);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('8','Verena', 'Reckless', 'vreckless7@umn.edu', 7/22/2006, 1);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('9','Cynthea', 'Meatcher', 'cmeatcher8@google.co.jp', 5/21/2014, 1);
insert into usuario (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento, Nivel) values ('10','Giselbert', 'Chaloner', 'gchaloner9@youku.com', 6/26/2008, 1);


--Escuelas---
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('1','Friedrick', 'Vespertina', 'Tecnica');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('2','Cornie', 'Matutina', 'Normal');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('3','Aida', 'Completa', 'Normal');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('4','Beverley', 'Completa', 'Tecnica');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('5','Nicki', 'Matutina', 'Normal');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('6','Devlin', 'Completa', 'Tecnica');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('7','Elston', 'Matutina', 'Normal');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('8','Glendon', 'Vespertina', 'Normal');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('9','Suzann', 'Vespertina', 'Tecnica');
insert into escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('10','Shannen', 'Vespertina', 'Normal');

--Curso--

insert into curso (Grado, Tanda) values ('1ro', 'Matutina');
insert into curso (Grado, Tanda) values ('2ro', 'Matutina');
insert into curso (Grado, Tanda) values ('3ro', 'Matutina');
insert into curso (Grado, Tanda) values ('4to', 'Matutina');
insert into curso (Grado, Tanda) values ('5to', 'Matutina');
insert into curso (Grado, Tanda) values ('6to', 'Matutina');
insert into curso (Grado, Tanda) values ('1to', 'Matutina');
insert into curso (Grado, Tanda) values ('2to', 'Matutina');
insert into curso (Grado, Tanda) values ('3to', 'Matutina');
insert into curso (Grado, Tanda) values ('2to', 'Matutina');


--Cargo--
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Secretaria');
insert into cargo (Cargo) values ('Cassandra');

--Solicitud--
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/4/10', 'Aceptado', 1, 1);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/3/1', 'Denegado', 2, 2);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/3/18', 'Denegado', 3, 3);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/3/22', 'Denegado', 4, 4);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/10/30', 'Denegado', 5, 5);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/7/21', 'Denegado', 6, 6);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/1/8', 'Denegado', 7, 7);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/5/9', 'Aceptado', 8, 8);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/3/7', 'Aceptado', 9, 9);
insert into solicitud (Fecha, Estatus, Id_Escuelas, Id_Usuario) values ('2020/1/15', 'Aceptado', 10, 10);

--Usuario_Estudiante--

insert into usuario_estudiante (Contraseña, Id_Usuario) values ('98-790-7324', 1);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('78-788-7684', 2);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('75-838-6457', 3);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('32-161-2890', 4);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('33-120-1252', 5);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('61-344-7907', 6);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('45-940-5588', 7);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('65-114-6990', 8);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('76-826-7218', 9);
insert into usuario_estudiante (Contraseña, Id_Usuario) values ('74-587-4751', 10);

--Cargo_Seleccionar--
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (1,1,1);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (2,2,2);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (3,3,3);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (4,4,4);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (5,5,5);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (6,6,6);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (7,7,7);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (8,8,8);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (9,9,9);
insert into cargo_seleccionar (Id_Escuelas, Id_Cargo, Id_Usuario) values (10,9,10);

--Usuario_Administrativo--
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('123456', 1);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('1234567', 2);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('12345678', 3);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('123456789', 4);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('12345678910', 5);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('61-344-7907', 6);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('45-940-5588', 7);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('65-114-6990', 8);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('76-826-7218', 9);
insert into usuario_administrativo (Contraseña, Id_Usuario) values ('74-587-4751', 10);


--Modificaciones nuevas--
ALTER TABLE solicitud ADD (Id_Curso INT);
ALTER TABLE solicitud ADD FOREIGN KEY (Id_Curso) REFERENCES curso(ID_Curso);

ALTER TABLE usuario ADD (Id_Escuelas INT);
ALTER TABLE  usuario ADD FOREIGN KEY (Id_Escuelas) REFERENCES escuelas(Id_Escuelas)