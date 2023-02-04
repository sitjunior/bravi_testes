<?php
namespace App\Models;
  
use CodeIgniter\Model;
  
class ContactsModel extends Model
{
    protected $table = 'contacts';
    protected $primaryKey = 'id';
    protected $allowedFields = ['people_id', 'type', 'label', 'value'];
    protected $validationRules = [
        'people_id' => 'required|integer',
        'type' => 'required|max_length[1]',
        'label' => 'required|max_length[50]',
        'value' => 'required|max_length[50]',
    ];
}