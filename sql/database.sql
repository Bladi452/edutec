use edutec;

--tablas principales----

create table Estudiantes(
    Id_Estudiantes int AUTO_INCREMENT PRIMARY KEY, 
    Matricula VARCHAR (9),
    Nombre VARCHAR (200),
    Apellido VARCHAR (200),
    Correo VARCHAR (200),
    Fecha_Nacimiento DATE
)

create table Escuelas(
    Id_Escuelas INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Escuelas VARCHAR (10),
    Nombre VARCHAR (200),
    Tanda VARCHAR (200),
    Modalidad VARCHAR (200)
)

create table Curso(
    ID_Curso int PRIMARY KEY  AUTO_INCREMENT,
    Grado VARCHAR (200),
    Tanda VARCHAR (200)
)

create table Administrativos(
    Id_Administrativo int PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR (200),
    Fecha_Nacimiento DATE
)

create table Cargo(
    Id_Cargo int AUTO_INCREMENT PRIMARY KEY,
    Cargo VARCHAR (200)
)

create table Solicitud(
    Id_Solicitud INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE,
    Estatus VARCHAR(200),
    Id_Escuelas INT,
    Id_Estudiantes INT,
    FOREIGN KEY (Id_Escuelas) REFERENCES Escuelas(Id_Escuelas),
    FOREIGN KEY (Id_Estudiantes) REFERENCES Estudiantes(Id_Estudiantes)
)

create table Usuario_Estudiante(
    ID_Estudiante int AUTO_INCREMENT PRIMARY KEY,
    Contraseña VARCHAR (200),
    Id_Estudiantes INT,
    FOREIGN KEY (Id_Estudiantes) REFERENCES Estudiantes(Id_Estudiantes)
)

create table Cargo_Seleccionar(
    Id_Cargo_Seleccionar INT AUTO_INCREMENT PRIMARY KEY,
    Id_Escuelas int,
    Id_Cargo int,
    Id_Administrativo int,
    FOREIGN KEY (Id_Escuelas) REFERENCES Escuelas(Id_Escuelas),
    FOREIGN KEY (Id_Cargo) REFERENCES Cargo (Id_Cargo),
    FOREIGN KEY (Id_Administrativo) REFERENCES Administrativos(Id_Administrativo)
)

create table Usuario_Administrativo(
    Id_Usu_Administrativo int AUTO_INCREMENT PRIMARY KEY,
    Contraseña VARCHAR (200),
    Id_Administrativo int,
    FOREIGN KEY (Id_Administrativo) REFERENCES Administrativos(Id_Administrativo)
)


select * from Estudiantes;
select * from Inscripcion;
select * from Documentos;
select * from Solicitud;
select * from Escuelas;
select * from Administrativo;
select * from Usuario_Administrativo;
drop table Administrativo
drop table Usuario_Administrativo
drop table Cargo_Seleccionar

drop table Escuelas
drop table Solicitud


drop table Documentos
drop table Documentos



drop table Estudiantes
drop table Escuelas
drop table Cargo
drop table Curso
DROP  table Curso_Relacion
drop table Administrativos
drop table Solicitud
DROP table Usuario_Estudiante
drop table Cargo_Seleccionar
drop table Usuario_Administrativo

--Estudiantes--

insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('1' ,'Etienne', 'Pike', 'epike0@multiply.com', 12/18/2002);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('2','Constantin', 'Brodeur', 'cbrodeur1@vimeo.com', 7/19/2004);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('3','Loretta', 'Gatenby', 'lgatenby2@hao123.com', 4/29/2007);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('4','Jamill', 'Collyear', 'jcollyear3@icq.com', 4/9/2007);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('5','Tresa', 'McGroarty', 'tmcgroarty4@uol.com.br', 8/7/2005);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('6','Monika', 'Astman', 'mastman5@engadget.com', 11/23/2005);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('7','Zena', 'Etherton', 'zetherton6@odnoklassniki.ru', 6/5/2010);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('8','Verena', 'Reckless', 'vreckless7@umn.edu', 7/22/2006);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('9','Cynthea', 'Meatcher', 'cmeatcher8@google.co.jp', 5/21/2014);
insert into Estudiantes (Matricula, Nombre, Apellido, Correo, Fecha_Nacimiento) values ('10','Giselbert', 'Chaloner', 'gchaloner9@youku.com', 6/26/2008);


--Escuelas---
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('1','Friedrick', 'Vespertina', 'Tecnica');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('2','Cornie', 'Matutina', 'Normal');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('3','Aida', 'Completa', 'Normal');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('4','Beverley', 'Completa', 'Tecnica');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('5','Nicki', 'Matutina', 'Normal');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('6','Devlin', 'Completa', 'Tecnica');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('7','Elston', 'Matutina', 'Normal');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('8','Glendon', 'Vespertina', 'Normal');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('9','Suzann', 'Vespertina', 'Tecnica');
insert into Escuelas (Codigo_Escuelas, Nombre, Tanda, Modalidad) values ('10','Shannen', 'Vespertina', 'Normal');

--Curso--

insert into Curso (Grado, Tanda) values ('1ro', 'Matutina');
insert into Curso (Grado, Tanda) values ('2ro', 'Matutina');
insert into Curso (Grado, Tanda) values ('3ro', 'Matutina');
insert into Curso (Grado, Tanda) values ('4to', 'Matutina');
insert into Curso (Grado, Tanda) values ('5to', 'Matutina');
insert into Curso (Grado, Tanda) values ('6to', 'Matutina');
insert into Curso (Grado, Tanda) values ('1to', 'Matutina');
insert into Curso (Grado, Tanda) values ('2to', 'Matutina');
insert into Curso (Grado, Tanda) values ('3to', 'Matutina');
insert into Curso (Grado, Tanda) values ('2to', 'Matutina');

---Administrativo---
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Julienne', 3/5/1907);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Andrus', 10/4/1973);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Hayyim', 2/27/1920);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Tristam', 3/20/1940);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Lalo', 12/24/1959);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Matty', 11/15/1927);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Patsy', 5/7/1940);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Marcy', 11/25/1936);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Sheryl', 4/15/1958);
insert into Administrativos (Nombre, Fecha_Nacimiento) values ('Rennie', 9/10/1918);

--Cargo--
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Secretaria');
insert into Cargo (Cargo) values ('Cassandra');

--Solicitud--
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/4/10', 'Aceptado', 1, 1);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/3/1', 'Denegado', 2, 2);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/3/18', 'Denegado', 3, 3);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/3/22', 'Denegado', 4, 4);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/10/30', 'Denegado', 5, 5);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/7/21', 'Denegado', 6, 6);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/1/8', 'Denegado', 7, 7);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/5/9', 'Aceptado', 8, 8);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/3/7', 'Aceptado', 9, 9);
insert into Solicitud (Fecha, Estatus, Id_Escuelas, Id_Estudiantes) values ('2020/1/15', 'Aceptado', 10, 10);

--Usuario_Estudiante--

insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('98-790-7324', 1);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('78-788-7684', 2);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('75-838-6457', 3);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('32-161-2890', 4);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('33-120-1252', 5);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('61-344-7907', 6);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('45-940-5588', 7);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('65-114-6990', 8);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('76-826-7218', 9);
insert into Usuario_Estudiante (Contraseña, Id_Estudiantes) values ('74-587-4751', 10);

--Cargo_Seleccionar--
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (1,1,1);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (2,2,2);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (3,3,3);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (4,4,4);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (5,5,5);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (6,6,6);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (7,7,7);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (8,8,8);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (9,9,9);
insert into Cargo_Seleccionar (Id_Escuelas, Id_Cargo, Id_Administrativo) values (10,9,10);

--Usuario_Administrativo--
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('123456', 1);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('1234567', 2);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('12345678', 3);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('123456789', 4);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('12345678910', 5);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('61-344-7907', 6);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('45-940-5588', 7);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('65-114-6990', 8);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('76-826-7218', 9);
insert into Usuario_Administrativo (Contraseña, Id_Administrativo) values ('74-587-4751', 10);
