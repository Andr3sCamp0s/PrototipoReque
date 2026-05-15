import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Divider,
  Progress,
  User
} from "@nextui-org/react";

function ReservarCita() {

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Demo HeroUI / NextUI
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* CARD PERFIL */}

        <Card className="p-4 shadow-2xl">

          <CardHeader className="flex justify-between">

            <User
              name="Dr. Juan Pérez"
              description="Cardiología"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=doctor"
              }}
            />

            <Chip color="success">
              Disponible
            </Chip>

          </CardHeader>

          <Divider />

          <CardBody className="mt-4">

            <p className="text-gray-500 mb-4">
              Especialista con más de 10 años de experiencia.
            </p>

            <Progress
              aria-label="Pacientes"
              value={80}
              className="mb-4"
            />

            <Button color="danger">
              Reservar cita
            </Button>

          </CardBody>

        </Card>

        {/* FORMULARIO */}

        <Card className="p-6 shadow-2xl">

          <CardHeader>
            <h2 className="text-2xl font-semibold">
              Registro rápido
            </h2>
          </CardHeader>

          <CardBody className="gap-4">

            <Input
              label="Nombre completo"
              placeholder="Juan Pérez"
            />

            <Input
              type="email"
              label="Correo"
              placeholder="correo@gmail.com"
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
            />

            <Button
              color="primary"
              className="mt-2"
            >
              Crear cuenta
            </Button>

          </CardBody>

        </Card>

        {/* TABS */}

        <Card className="p-4 shadow-2xl col-span-1 md:col-span-2">

          <Tabs aria-label="Opciones">

            <Tab key="citas" title="Citas">

              <div className="p-4">

                <h3 className="text-xl font-semibold mb-2">
                  Próximas citas
                </h3>

                <div className="flex gap-4 flex-wrap">

                  <Card className="w-64">
                    <CardBody>
                      <p className="font-semibold">
                        Medicina General
                      </p>

                      <p className="text-gray-500">
                        15 Mayo - 2:00 PM
                      </p>
                    </CardBody>
                  </Card>

                  <Card className="w-64">
                    <CardBody>
                      <p className="font-semibold">
                        Odontología
                      </p>

                      <p className="text-gray-500">
                        20 Mayo - 9:00 AM
                      </p>
                    </CardBody>
                  </Card>

                </div>

              </div>

            </Tab>

            <Tab key="historial" title="Historial">

              <div className="p-4">

                <p className="text-gray-500">
                  Historial de consultas médicas.
                </p>

              </div>

            </Tab>

            <Tab key="perfil" title="Perfil">

              <div className="p-4 flex items-center gap-4">

                <Avatar
                  src="https://i.pravatar.cc/150?u=usuario"
                  className="w-20 h-20"
                />

                <div>

                  <p className="font-bold text-xl">
                    Andrés Campos
                  </p>

                  <p className="text-gray-500">
                    Usuario activo
                  </p>

                </div>

              </div>

            </Tab>

          </Tabs>

        </Card>

      </div>

    </div>
  );
}

export default ReservarCita;