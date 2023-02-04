<?php
namespace App\Models;
  
use CodeIgniter\Model;
  
class PeopleModel extends Model
{
    protected $table = 'people';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name'];
    protected $validationRules = [
        'name' => 'required|max_length[50]|is_unique[people.name]'    
    ];
    protected $validationMessages = [
        'name' => [
            'is_unique' => 'O nome informado já existe no banco de dados!',
        ]
    ];
}