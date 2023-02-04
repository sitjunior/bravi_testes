<?php
namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ContactsModel;
 
class Contacts extends ResourceController
{
    use ResponseTrait;

    public function __construct() {
        $this->contacts = new ContactsModel();
    }

    public function index()
    {
        $data = $this->contacts->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->contacts->getWhere(['id' => $id])->getResult();

        if($data){
            return $this->respond($data);
        }
        
        return $this->failNotFound('Nenhum dado encontrado com id '.$id);        
    }

    public function create()
    {
        $data = $this->request->getJSON();

        if($this->contacts->insert($data)){
            $response = [
                'status'   => 201,
                'error'    => null,
                'messages' => [
                    'success' => 'Dados salvos'
                ]
            ];
            return $this->respondCreated($response);
        }

        return $this->fail($this->contacts->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON();
        
        if($this->contacts->update($id, $data)){
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Dados atualizados'
                ]
            ];
            return $this->respond($response);
        };

        return $this->fail($this->contacts->errors());
    }

    public function delete($id = null)
    {
        $data = $this->contacts->find($id);
        
        if($data){
            $this->contacts->delete($id);
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