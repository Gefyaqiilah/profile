import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface ContactForm {
  name: string;
  email: string;
  type: 'message' | 'cv';
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form: ContactForm = { name: '', email: '', type: 'message', message: '' };
  submitted = false;
  sending = false;

  get isCV() {
    return this.form.type === 'cv';
  }

  onSubmit() {
    this.sending = true;
    
    // Construct the email subject and body
    const subject = `New ${this.form.type === 'cv' ? 'CV Request' : 'Message'} from ${this.form.name}`;
    const body = `Name: ${this.form.name}%0DEmail: ${this.form.email}%0DType: ${this.form.type === 'cv' ? 'CV Request' : 'Message'}%0D%0DMessage:%0D${this.form.message}`;
    
    // Create mailto link and trigger it
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Update UI state
    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
    }, 500);
  }

  reset() {
    this.form = { name: '', email: '', type: 'message', message: '' };
    this.submitted = false;
  }
}
