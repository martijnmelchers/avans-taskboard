import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectForm: FormGroup;
  constructor(private fb: FormBuilder, private _project: ProjectService ) {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  get name() { return this.projectForm.get('name'); }
  get description() { return this.projectForm.get('description'); }

  ngOnInit(): void {
  }


  async createProject(data: FormData){
    try {
      await this._project.createProject(data);
    }
    catch (e) {
      console.error(e);
    }
  }

}
