<?php
namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PeopleModel;
 
class People extends ResourceController
{
    use ResponseTrait;

    public function __construct() {
        $this->people = new PeopleModel();
    }

    public function index()
    {
        $data = $this->people->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->people->getWhere(['id' => $id])->getResult();

        if($data){
            return $this->respond($data);
        }
        
        return $this->failNotFound('Nenhum dado encontrado com id '.$id);        
    }

    public function create()
    {
        $data = $this->request->getJSON();

        if($this->people->insert($data)){
            $response = [
                'status'   => 201,
                'error'    => null,
                'messages' => [
                    'success' => 'Dados salvos'
                ]
            ];
            return $this->respondCreated($response);
        }

        return $this->fail($this->people->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON();
        
        if($this->people->update($id, $data)){
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Dados atualizados'
                ]
            ];
            return $this->respond($response);
        };

        return $this->fail($this->people->errors());
    }

    public function delete($id = null)
    {
        $data = $this->people->find($id);
        
        if($data){
            $this->people->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Dados removidos'
                ]
            ];
            return $this->respondDeleted($response);
        }
        
        return $this->failNotFound('Nenhum dado encontrado com id '.$id);        
    }
 
}